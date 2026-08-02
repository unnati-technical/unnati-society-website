import { sendChatMessage } from './apiClient';
import { ContextManager } from './contextManager';
import { getResponse } from './responseBuilder';
import { parseEntities } from './nlpRules';
import { getRecommendations } from './recommendationEngine';
import type { BotMessage } from '../types';

/**
 * Main router — tries the RAG AI API first, falls back to hardcoded responses.
 */
export async function routeIntent(
  intent: string,
  userInput: string,
  language = 'en',
  userId?: string,
): Promise<BotMessage | ReturnType<typeof getResponse>> {
  const context = ContextManager.getInstance();
  context.logIntent(intent);

  // ── 1. If a form is active, use local form handler (no AI needed) ────────────
  if (context.getActiveForm()) {
    return handleFormStep(userInput);
  }

  // ── 2. NLP Entity Extraction ─────────────────────────────────────────────────
  const nlpIntent = parseEntities(userInput);
  if (nlpIntent) {
    intent = nlpIntent;
  }

  // ── 3. Navigation intents — handle locally ───────────────────────────────────
  if (intent.startsWith('nav_') || intent.startsWith('action_')) {
    return getResponse(intent);
  }

  // ── 4. Form starts — handle locally ─────────────────────────────────────────
  if (intent.startsWith('start_form_')) {
    const formName = intent.replace('start_form_', '');
    context.startForm(formName);
    return handleFormStep(userInput);
  }

  // ── 5. Recommendation engine ─────────────────────────────────────────────────
  if (intent === 'recommend_roles') {
    return getRecommendations();
  }

  // ── 6. Try RAG AI API ────────────────────────────────────────────────────────
  try {
    const apiResponse = await sendChatMessage(userInput, language, userId);

    if (apiResponse) {
      // Map API response to the BotMessage format the UI understands
      const msg: BotMessage = {
        id: Date.now().toString(),
        type: apiResponse.type === 'navigation' ? 'navigation' : apiResponse.buttons?.length ? 'rich_card' : 'text',
        role: 'assistant',
        content: apiResponse.reply,
        buttons: apiResponse.buttons,
        sources: apiResponse.sources,
        timestamp: new Date(),
        intent: apiResponse.intent,
      };

      // Handle navigation redirects
      if (apiResponse.type === 'navigation') {
        return getResponse(apiResponse.intent || intent);
      }

      return msg;
    }
  } catch (err) {
    console.warn('[Router] AI API failed, using local fallback:', err);
  }

  // ── 7. Hardcoded local fallback ──────────────────────────────────────────────
  if (intent === 'volunteer_contextual') {
    const activeProgram = context.getActiveProgram();
    if (activeProgram) return getResponse(`volunteer_${activeProgram}`);
    return getResponse('volunteer_main');
  }

  if (intent.startsWith('program_')) {
    context.setActiveProgram(intent.replace('program_', ''));
  }

  return getResponse(intent);
}

// ── Local form handler (unchanged from original) ─────────────────────────────

async function handleFormStep(userInput: string) {
  const context = ContextManager.getInstance();
  const form = context.getActiveForm();
  const step = context.getFormStep();

  if (form === 'volunteer') {
    if (step === 0) {
      context.advanceForm();
      return {
        type: 'text',
        data: {
          text: "Great! Let's find the best role for you. What describes you best?",
          buttons: [
            { label: 'Student', action: 'prof_student' },
            { label: 'Professional', action: 'prof_pro' },
            { label: 'Teacher', action: 'prof_teacher' },
          ],
        },
      };
    }
    if (step === 1) {
      context.updateUserProfile('profession', userInput);
      context.advanceForm();
      return { type: 'text', data: { text: 'Which city are you currently in?' } };
    }
    if (step === 2) {
      context.updateUserProfile('city', userInput);
      context.advanceForm();
      return {
        type: 'text',
        data: {
          text: 'When are you usually available?',
          buttons: [
            { label: 'Weekends', action: 'avail_weekend' },
            { label: 'Weekdays', action: 'avail_week' },
            { label: 'Flexible', action: 'avail_flex' },
          ],
        },
      };
    }
    if (step === 3) {
      context.updateUserProfile('availability', userInput);
      context.advanceForm();
      return {
        type: 'text',
        data: { text: 'What are your primary skills? (e.g. Coding, Teaching, Design, Marketing)' },
      };
    }
    if (step === 4) {
      context.updateUserProfile('skills', userInput.toLowerCase());
      context.clearForm();
      return getRecommendations();
    }
  }

  if (form === 'request_call') {
    if (step === 0) {
      context.advanceForm();
      return {
        type: 'text',
        data: { text: "I'd be happy to arrange a call with our coordinators. What is your name?" },
      };
    }
    if (step === 1) {
      context.updateUserProfile('name', userInput);
      context.advanceForm();
      return { type: 'text', data: { text: 'Thanks! And what is your phone number?' } };
    }
    if (step === 2) {
      context.updateUserProfile('phone', userInput);
      context.advanceForm();
      return {
        type: 'text',
        data: {
          text: 'What is the primary purpose of the call?',
          buttons: [
            { label: 'Volunteer', action: 'purp_vol' },
            { label: 'Partnership', action: 'purp_part' },
            { label: 'Other', action: 'purp_other' },
          ],
        },
      };
    }
    if (step === 3) {
      context.clearForm();
      return {
        type: 'rich_card',
        data: {
          title: 'Callback Requested ✅',
          description: `Thanks ${context.getUserProfile().name}. We have forwarded your request to our Admin dashboard. A coordinator will call you at ${context.getUserProfile().phone} shortly.`,
          buttons: [{ label: 'Back to Home', action: 'nav_programs' }],
        },
      };
    }
  }

  if (form === 'contact_us') {
    if (step === 0) {
      context.advanceForm();
      return {
        type: 'text',
        data: { text: 'I can help send an email to our team right now! What is your name?' },
      };
    }
    if (step === 1) {
      context.updateUserProfile('name', userInput);
      context.advanceForm();
      return { type: 'text', data: { text: `Nice to meet you ${userInput}. What is your email address?` } };
    }
    if (step === 2) {
      context.updateUserProfile('email', userInput);
      context.advanceForm();
      return { type: 'text', data: { text: 'Got it. Finally, what is your message for us?' } };
    }
    if (step === 3) {
      const profile = context.getUserProfile();
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
            subject: 'Chatbot Inquiry',
            role: 'Other',
            message: userInput,
          }),
        });
        if (!res.ok) throw new Error('Failed');
        context.clearForm();
        return {
          type: 'rich_card',
          data: {
            title: 'Message Sent! 📨',
            description: `Thanks ${profile.name}. Your message has been successfully emailed to our team!`,
            buttons: [{ label: 'Back to Home', action: 'nav_programs' }],
          },
        };
      } catch {
        context.clearForm();
        return {
          type: 'text',
          data: {
            text: 'Oops, something went wrong while sending your message. Please try again later or use the Contact Us page.',
          },
        };
      }
    }
  }

  context.clearForm();
  return getResponse('unknown');
}

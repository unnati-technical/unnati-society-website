import type { SourceCitation } from '../types';

export interface ChatApiRequest {
  message: string;
  sessionId?: string;
  language?: string;
  userId?: string;
}

export interface ChatApiResponse {
  reply: string;
  type: 'text' | 'rich_card' | 'navigation';
  sources?: SourceCitation[];
  buttons?: { label: string; action: string }[];
  sessionId: string;
  intent: string;
}

// Always use relative URL so Next.js proxy (next.config.js rewrites) handles routing.
// In dev, the web app's next.config.js proxies /api/* → http://localhost:3005 (or 3006).
const API_BASE = '';

const CHAT_ENDPOINT = `${API_BASE}/api/chat/message`;

const SESSION_KEY = 'unnati_chat_session_id';

/**
 * Send a message to the NestJS chat API and get an AI response.
 * Falls back to null if the API is unreachable (UI can handle offline state).
 */
export async function sendChatMessage(
  message: string,
  language = 'en',
  userId?: string,
): Promise<ChatApiResponse | null> {
  const sessionId = getSessionId();

  try {
    const response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        sessionId,
        language,
        userId,
      } satisfies ChatApiRequest),
      signal: AbortSignal.timeout(15000), // 15s timeout
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const envelope = await response.json();
    // Unwrap NestJS TransformInterceptor envelope: { success: true, data: {...} }
    const data: ChatApiResponse = envelope.data ?? envelope;

    // Persist session ID
    if (data.sessionId) {
      saveSessionId(data.sessionId);
    }

    return data;
  } catch (error) {
    // Network error or timeout — return null for fallback handling
    console.warn('[Unnati Chat] API unavailable, falling back:', error);
    return null;
  }
}

/**
 * Check if the chat API is healthy.
 */
export async function checkChatHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/chat/health`, {
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function getSessionId(): string | undefined {
  try {
    return sessionStorage.getItem(SESSION_KEY) || undefined;
  } catch {
    return undefined;
  }
}

function saveSessionId(id: string): void {
  try {
    sessionStorage.setItem(SESSION_KEY, id);
  } catch {
    // sessionStorage unavailable in some contexts
  }
}

export function clearChatSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

import { ContextManager } from './contextManager';

const CITIES = ['patna', 'bhagalpur', 'delhi', 'mumbai', 'bangalore', 'kolkata', 'pune', 'hyderabad', 'chennai', 'noida', 'gurgaon', 'jaipur', 'lucknow', 'ranchi'];
const SKILLS = ['computer science', 'cs', 'coding', 'design', 'photography', 'writing', 'public speaking', 'marketing', 'teaching', 'web development', 'app development', 'management', 'finance', 'pr', 'public relations', 'event management'];
const PROFESSIONS = ['student', 'teacher', 'professional', 'ngo', 'corporate'];

export function parseEntities(userInput: string) {
  const context = ContextManager.getInstance();
  const lowerInput = userInput.toLowerCase();

  // Extract City
  if (lowerInput.includes('from ') || lowerInput.includes('in ')) {
    for (const city of CITIES) {
      if (lowerInput.includes(city)) {
        context.updateUserProfile('city', city);
      }
    }
  }

  // Extract Profession
  if (lowerInput.includes('i am a ') || lowerInput.includes("i'm a ") || lowerInput.includes('i study ')) {
    for (const prof of PROFESSIONS) {
      if (lowerInput.includes(prof)) {
        context.updateUserProfile('profession', prof);
      }
    }
  }

  // Extract Skills
  for (const skill of SKILLS) {
    if (lowerInput.includes(skill)) {
      context.updateUserProfile('skills', skill);
    }
  }

  // Direct intent override mapping for empathy
  if (lowerInput.includes('want to teach children') || lowerInput.includes('want to help children')) {
    return 'volunteer_teach_empathy';
  }
  
  if (lowerInput.includes("don't have much time") || lowerInput.includes("little time")) {
    return 'volunteer_time_empathy';
  }

  return null;
}

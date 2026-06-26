import Fuse from 'fuse.js';
import keywordsData from '../data/keywords.json';
import { ContextManager } from './contextManager';

// Flatten the structure for Fuse.js so each keyword maps to an intent
const flatData = keywordsData.flatMap(item => 
  item.keywords.map(keyword => ({ keyword, intent: item.intent }))
);

const fuse = new Fuse(flatData, {
  keys: ['keyword'],
  threshold: 0.4, // Lower threshold = stricter match (0.0 is exact match, 1.0 is match anything)
  includeScore: true,
  ignoreLocation: true,
});

export function findIntent(userInput) {
  const result = fuse.search(userInput);
  
  // Contextual check for pronouns like "there" or "it" when discussing programs
  const lowerInput = userInput.toLowerCase();
  if ((lowerInput.includes('there') || lowerInput.includes('it')) && 
      (lowerInput.includes('volunteer') || lowerInput.includes('join'))) {
    if (ContextManager.getInstance().getActiveProgram()) {
      return 'volunteer_contextual';
    }
  }

  if (result.length > 0 && result[0].score < 0.5) {
    return result[0].item.intent;
  }
  return 'unknown';
}

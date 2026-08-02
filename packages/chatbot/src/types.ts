// Shared types for the chatbot package

export interface SourceCitation {
  title: string;
  source: string;
}

export interface ChatButton {
  label: string;
  action: string;
  intent?: string;
}

export interface BotMessage {
  id: string;
  type: 'text' | 'rich_card' | 'navigation' | 'loading';
  role: 'user' | 'assistant';
  content?: string;
  title?: string;
  description?: string;
  buttons?: ChatButton[];
  sources?: SourceCitation[];
  timestamp: Date;
  intent?: string;
}

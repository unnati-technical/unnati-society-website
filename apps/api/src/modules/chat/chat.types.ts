export type IntentType =
  | 'rag'
  | 'sql'
  | 'tool'
  | 'hybrid'
  | 'greeting'
  | 'fallback';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface RetrievedChunk {
  id: string;
  content: string;
  documentTitle: string;
  documentSource: string;
  score: number;
}

export interface ToolResult {
  toolName: string;
  data: unknown;
  formattedText: string;
}

export interface OrchestratorInput {
  message: string;
  sessionId: string;
  history: ChatMessage[];
  userId?: string;
  language?: string;
}

export interface OrchestratorOutput {
  text: string;
  type: 'text' | 'rich_card' | 'navigation';
  intent: IntentType;
  sources?: SourceCitation[];
  buttons?: { label: string; action: string }[];
  data?: Record<string, unknown>;
}

export interface SourceCitation {
  title: string;
  source: string;
}

export interface ChatApiResponse {
  reply: string;
  type: 'text' | 'rich_card' | 'navigation';
  sources?: SourceCitation[];
  buttons?: { label: string; action: string }[];
  sessionId: string;
  intent: IntentType;
}

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrchestratorService } from './orchestrator.service';
import { ChatMessage, ChatApiResponse, OrchestratorInput } from './chat.types';
import { randomUUID } from 'crypto';

const SESSION_TTL_HOURS = 2;
const MAX_HISTORY_MESSAGES = 20;

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly orchestrator: OrchestratorService,
  ) {}

  /**
   * Process a user message: load/create session, run orchestrator, save history.
   */
  async processMessage(
    message: string,
    sessionId?: string,
    userId?: string,
    language = 'en',
  ): Promise<ChatApiResponse> {
    // ── 1. Load or create session ──────────────────────────────────────────────
    const { session, history } = await this.getOrCreateSession(
      sessionId,
      userId,
    );

    // ── 2. Run orchestrator ───────────────────────────────────────────────────
    const input: OrchestratorInput = {
      message,
      sessionId: session.id,
      history,
      userId,
      language,
    };

    const output = await this.orchestrator.process(input);

    // ── 3. Save messages to session ───────────────────────────────────────────
    const userMsg: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    const assistantMsg: ChatMessage = {
      role: 'assistant',
      content: output.text,
      timestamp: new Date(),
    };

    const updatedHistory = [...history, userMsg, assistantMsg].slice(
      -MAX_HISTORY_MESSAGES,
    );

    await this.prisma.chatSession.update({
      where: { id: session.id },
      data: {
        messages: JSON.stringify(updatedHistory),
        updatedAt: new Date(),
        expiresAt: new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000),
      },
    });

    return {
      reply: output.text,
      type: output.type,
      sources: output.sources,
      buttons: output.buttons,
      sessionId: session.id,
      intent: output.intent,
    };
  }

  private async getOrCreateSession(sessionId?: string, userId?: string) {
    if (sessionId) {
      try {
        const existing = await this.prisma.chatSession.findUnique({
          where: { id: sessionId },
        });
        if (existing && existing.expiresAt > new Date()) {
          const history: ChatMessage[] = JSON.parse(existing.messages || '[]');
          return { session: existing, history };
        }
      } catch (e) {
        this.logger.warn(`Session lookup failed: ${e.message}`);
      }
    }

    // Create new session
    const newSession = await this.prisma.chatSession.create({
      data: {
        id: randomUUID(),
        userId: userId || null,
        messages: '[]',
        expiresAt: new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000),
      },
    });

    return { session: newSession, history: [] };
  }

  /**
   * Clean up expired sessions (called by a cron job or manually).
   */
  async cleanExpiredSessions(): Promise<number> {
    const result = await this.prisma.chatSession.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    return result.count;
  }
}

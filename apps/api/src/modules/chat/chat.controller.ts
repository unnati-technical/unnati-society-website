import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { IngestService } from './ingest.service';
import { ChatMessageDto, IngestDocumentDto } from './dto/chat-message.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('chat')
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly ingestService: IngestService,
  ) {}

  /**
   * Main chat endpoint — public (no JWT required)
   * POST /api/chat/message
   */
  @Public()
  @Post('message')
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Body() dto: ChatMessageDto) {
    this.logger.log(
      `Chat message received (session: ${dto.sessionId || 'new'})`,
    );
    return this.chatService.processMessage(
      dto.message,
      dto.sessionId,
      dto.userId,
      dto.language || 'en',
    );
  }

  /**
   * Admin: ingest a document into the knowledge base
   * POST /api/chat/admin/ingest
   */
  @Post('admin/ingest')
  @HttpCode(HttpStatus.CREATED)
  async ingestDocument(@Body() dto: IngestDocumentDto) {
    return this.ingestService.ingestDocument({
      title: dto.title,
      content: dto.content,
      type: dto.type || 'markdown',
      source: dto.source || dto.title,
    });
  }

  /**
   * Admin: list all knowledge documents
   * GET /api/chat/admin/documents
   */
  @Get('admin/documents')
  async listDocuments() {
    return this.ingestService.listDocuments();
  }

  /**
   * Admin: delete a knowledge document
   * DELETE /api/chat/admin/documents/:id
   */
  @Delete('admin/documents/:id')
  async deleteDocument(@Param('id') id: string) {
    await this.ingestService.deleteDocument(id);
    return { success: true };
  }

  /**
   * Health check for the chat module
   * GET /api/chat/health
   */
  @Public()
  @Get('health')
  chatHealth() {
    return {
      status: 'ok',
      service: 'chat',
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString(),
    };
  }
}

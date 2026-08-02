import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { EmbeddingService } from './embedding.service';
import { RagService } from './rag.service';
import { ToolsService } from './tools.service';
import { IngestService } from './ingest.service';
import { OrchestratorService } from './orchestrator.service';
import { RagProcessor } from './rag.processor';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule, BullModule.registerQueue({ name: 'rag' })],
  controllers: [ChatController],
  providers: [
    ChatService,
    EmbeddingService,
    RagService,
    ToolsService,
    IngestService,
    OrchestratorService,
    RagProcessor,
  ],
  exports: [ChatService, IngestService],
})
export class ChatModule {}

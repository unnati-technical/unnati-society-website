import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmbeddingService } from './embedding.service';

export interface IngestOptions {
  title: string;
  content: string;
  type?: string;
  source?: string;
  chunkSize?: number;
  chunkOverlap?: number;
}

@Injectable()
export class IngestService {
  private readonly logger = new Logger(IngestService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly embedding: EmbeddingService,
  ) {}

  /**
   * Split text into overlapping chunks.
   */
  private chunkText(text: string, chunkSize = 400, overlap = 50): string[] {
    const words = text.split(/\s+/);
    const chunks: string[] = [];
    let i = 0;

    while (i < words.length) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      if (chunk.trim().length > 20) {
        chunks.push(chunk.trim());
      }
      i += chunkSize - overlap;
    }

    return chunks;
  }

  /**
   * Ingest a document: chunk it, embed each chunk, store in DB.
   * If a document with the same source already exists, it's deleted and re-created.
   */
  async ingestDocument(
    options: IngestOptions,
  ): Promise<{ chunksCreated: number }> {
    const {
      title,
      content,
      type = 'markdown',
      source = title,
      chunkSize = 400,
      chunkOverlap = 50,
    } = options;

    this.logger.log(`Ingesting document: "${title}" (source: ${source})`);

    // Delete existing document with same source (re-index)
    await this.prisma.knowledgeDocument.deleteMany({ where: { source } });

    // Create document record
    const doc = await this.prisma.knowledgeDocument.create({
      data: { title, type, source, isActive: true },
    });

    // Split into chunks
    const rawChunks = this.chunkText(content, chunkSize, chunkOverlap);
    this.logger.log(`  → ${rawChunks.length} chunks to embed`);

    let created = 0;
    for (let i = 0; i < rawChunks.length; i++) {
      const chunkText = rawChunks[i];
      try {
        const embeddingValues = await this.embedding.embedText(chunkText);
        const vectorStr = `[${embeddingValues.join(',')}]`;

        // Use raw SQL to insert with vector type
        await this.prisma.$executeRaw`
          INSERT INTO "KnowledgeChunk" (id, "documentId", content, embedding, metadata, "chunkIndex", "createdAt")
          VALUES (
            gen_random_uuid(),
            ${doc.id},
            ${chunkText},
            ${vectorStr}::vector,
            ${'{}'},
            ${i},
            NOW()
          )
        `;
        created++;
      } catch (err) {
        this.logger.error(`  Chunk ${i} embed failed: ${err.message}`);
      }
    }

    this.logger.log(
      `  ✓ Ingested ${created}/${rawChunks.length} chunks for "${title}"`,
    );
    return { chunksCreated: created };
  }

  /**
   * Ingest multiple documents in sequence.
   */
  async ingestMany(
    docs: IngestOptions[],
  ): Promise<{ total: number; documents: string[] }> {
    let total = 0;
    const documents: string[] = [];

    for (const doc of docs) {
      const { chunksCreated } = await this.ingestDocument(doc);
      total += chunksCreated;
      documents.push(doc.title);
    }

    return { total, documents };
  }

  /**
   * List all knowledge documents.
   */
  async listDocuments() {
    return this.prisma.knowledgeDocument.findMany({
      include: { _count: { select: { chunks: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Delete a knowledge document and its chunks.
   */
  async deleteDocument(id: string): Promise<void> {
    await this.prisma.knowledgeDocument.delete({ where: { id } });
  }
}

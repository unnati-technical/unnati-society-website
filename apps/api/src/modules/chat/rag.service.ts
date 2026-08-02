import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmbeddingService } from './embedding.service';
import { RetrievedChunk } from './chat.types';

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly embedding: EmbeddingService,
  ) {}

  /**
   * Search the knowledge base using pgvector cosine similarity.
   * Falls back to keyword search if vector search fails.
   */
  async search(query: string, topK = 5): Promise<RetrievedChunk[]> {
    try {
      // 1. Embed the query
      const queryEmbedding = await this.embedding.embedText(query);
      const vectorStr = `[${queryEmbedding.join(',')}]`;

      // 2. pgvector cosine similarity search using raw SQL
      const results = await this.prisma.$queryRaw<
        Array<{
          id: string;
          content: string;
          title: string;
          source: string;
          score: number;
        }>
      >`
        SELECT
          kc.id,
          kc.content,
          kd.title,
          kd.source,
          1 - (kc.embedding <=> ${vectorStr}::vector) AS score
        FROM "KnowledgeChunk" kc
        JOIN "KnowledgeDocument" kd ON kd.id = kc."documentId"
        WHERE kd."isActive" = true AND kc.embedding IS NOT NULL
        ORDER BY kc.embedding <=> ${vectorStr}::vector
        LIMIT ${topK}
      `;

      const formattedResults = results.map((r) => ({
        id: r.id,
        content: r.content,
        documentTitle: r.title,
        documentSource: r.source,
        score: Number(r.score),
      }));

      this.logger.log(
        `🔍 [RAG DEBUG] Retrieved ${formattedResults.length} chunks for query: "${query}"`,
      );
      formattedResults.forEach((r, idx) => {
        this.logger.log(
          `  -> [Rank ${idx + 1}] Score: ${r.score.toFixed(4)} | Doc: ${r.documentTitle} | Content: ${r.content.slice(0, 80).replace(/\n/g, ' ')}...`,
        );
      });

      return formattedResults;
    } catch (error) {
      this.logger.error(
        `Vector search failed, falling back to keyword search: ${error.message}`,
      );
      return this.keywordFallback(query, topK);
    }
  }

  /**
   * Simple keyword fallback search using ILIKE when pgvector is unavailable.
   */
  private async keywordFallback(
    query: string,
    topK: number,
  ): Promise<RetrievedChunk[]> {
    try {
      // Use a single safe ILIKE on the whole query string
      const safeQuery = `%${query.replace(/[%_]/g, '\\$&').slice(0, 200)}%`;
      const results = await this.prisma.$queryRaw<
        Array<{ id: string; content: string; title: string; source: string }>
      >`
        SELECT kc.id, kc.content, kd.title, kd.source
        FROM "KnowledgeChunk" kc
        JOIN "KnowledgeDocument" kd ON kd.id = kc."documentId"
        WHERE kd."isActive" = true
          AND kc.content ILIKE ${safeQuery}
        LIMIT ${topK}
      `;

      return results.map((r) => ({
        id: r.id,
        content: r.content,
        documentTitle: r.title,
        documentSource: r.source,
        score: 0.5,
      }));
    } catch (err) {
      this.logger.error(`Keyword fallback failed: ${err.message}`);
      return [];
    }
  }

  /**
   * Format retrieved chunks into a context string for the LLM prompt.
   */
  formatContext(chunks: RetrievedChunk[]): string {
    if (chunks.length === 0) return '';
    return chunks.map((c) => c.content).join('\n\n---\n\n');
  }
}

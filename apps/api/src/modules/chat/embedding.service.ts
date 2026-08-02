import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class EmbeddingService {
  private readonly logger = new Logger(EmbeddingService.name);
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      this.logger.warn(
        'GEMINI_API_KEY not set — embedding service will be unavailable',
      );
    }
    this.genAI = new GoogleGenerativeAI(apiKey || 'placeholder');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-embedding-2' });
  }

  /**
   * Generate a 768-dimension embedding vector for the given text.
   */
  async embedText(text: string): Promise<number[]> {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: { parts: [{ text: text.slice(0, 2048) }] },
            outputDimensionality: 768,
          }),
        },
      );
      const data = await res.json();
      if (!data.embedding) throw new Error(JSON.stringify(data));
      return data.embedding.values;
    } catch (error) {
      this.logger.error(`Embedding failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Batch embed multiple texts. Useful for ingestion.
   */
  async embedBatch(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];
    for (const text of texts) {
      const result = await this.model.embedContent({
        content: { role: 'user', parts: [{ text: text.slice(0, 2048) }] },
        outputDimensionality: 768,
      } as any);
      embeddings.push(result.embedding.values);
      // Small delay to respect rate limits
      await new Promise((r) => setTimeout(r, 100));
    }
    return embeddings;
  }
}

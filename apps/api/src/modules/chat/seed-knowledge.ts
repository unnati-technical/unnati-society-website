/**
 * Knowledge Base Seeding Script
 *
 * Run this script to ingest all knowledge base documents into PostgreSQL via pgvector.
 *
 * Prerequisites:
 *  1. pgvector extension enabled in your Neon DB (CREATE EXTENSION IF NOT EXISTS vector;)
 *  2. GEMINI_API_KEY set in apps/api/.env
 *  3. Database migrations applied (prisma db push)
 *
 * Usage (from monorepo root):
 *   $env:PATH = "D:\app lap;" + $env:PATH
 *   cmd /c "npx pnpm --filter=@unnati/api exec ts-node -r tsconfig-paths/register src/modules/chat/seed-knowledge.ts"
 */

import 'dotenv/config';
import { readFileSync } from 'fs';
import { join } from 'path';

// We import these directly to avoid NestJS bootstrap overhead
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import { Queue } from 'bullmq';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? true : undefined,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const bullRedisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  tls:
    process.env.REDIS_TLS === 'true'
      ? { rejectUnauthorized: false }
      : undefined,
};
const ragQueue = new Queue('rag', { connection: bullRedisConfig });

interface KnowledgeFile {
  title: string;
  file: string;
  type: string;
}

const KNOWLEDGE_FILES: KnowledgeFile[] = [
  // about.md contains faculty names, founding story, org structure — NOT stored in any DB table
  { title: 'About Unnati Society', file: 'about.md', type: 'markdown' },
  { title: 'Frequently Asked Questions', file: 'faq.md', type: 'faq' },
  { title: 'Volunteer Guide', file: 'volunteer.md', type: 'policy' },
  { title: 'Policies and Code of Ethics', file: 'policies.md', type: 'policy' },
];

const KNOWLEDGE_DIR = join(__dirname, '../../../../../knowledge');
const CHUNK_SIZE = 400; // words
const CHUNK_OVERLAP = 50; // words

function chunkText(text: string): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let i = 0;
  while (i < words.length) {
    const chunk = words.slice(i, i + CHUNK_SIZE).join(' ');
    if (chunk.trim().length > 30) chunks.push(chunk.trim());
    i += CHUNK_SIZE - CHUNK_OVERLAP;
  }
  return chunks;
}

async function getEmbedding(text: string, model: any): Promise<number[]> {
  const result = await model.embedContent({
    content: { role: 'user', parts: [{ text: text.slice(0, 2048) }] },
    outputDimensionality: 768,
  });
  return result.embedding.values;
}

async function main() {
  console.log('🚀 Unnati Knowledge Base Seeder\n');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.error(
      '❌ GEMINI_API_KEY is not set. Please add it to apps/api/.env',
    );
    process.exit(1);
  }

  // 1. Enable pgvector extension
  console.log('📦 Enabling pgvector extension...');
  try {
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS vector`;
    console.log('  ✓ pgvector enabled\n');
  } catch (e) {
    console.warn(`  ⚠ pgvector: ${e.message} (may already be enabled)\n`);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const embeddingModel = genAI.getGenerativeModel({
    model: 'gemini-embedding-2',
  });

  let totalChunks = 0;

  for (const kf of KNOWLEDGE_FILES) {
    console.log(`📄 Processing: ${kf.title}`);

    // Read file
    const filePath = join(KNOWLEDGE_DIR, kf.file);
    let content: string;
    try {
      content = readFileSync(filePath, 'utf-8');
    } catch (e) {
      console.error(`  ❌ Could not read ${filePath}: ${e.message}`);
      continue;
    }

    // Delete existing
    await prisma.knowledgeDocument.deleteMany({ where: { source: kf.file } });

    // Create document
    const doc = await prisma.knowledgeDocument.create({
      data: { title: kf.title, type: kf.type, source: kf.file, isActive: true },
    });

    // Chunk and embed
    const chunks = chunkText(content);
    console.log(`  → ${chunks.length} chunks to embed`);

    let success = 0;
    for (let i = 0; i < chunks.length; i++) {
      try {
        const embedding = await getEmbedding(chunks[i], embeddingModel);
        const vectorStr = `[${embedding.join(',')}]`;

        await prisma.$executeRaw`
          INSERT INTO "KnowledgeChunk" (id, "documentId", content, embedding, metadata, "chunkIndex", "createdAt")
          VALUES (
            gen_random_uuid(),
            ${doc.id},
            ${chunks[i]},
            ${vectorStr}::vector,
            ${'{}'},
            ${i},
            NOW()
          )
        `;
        success++;
        process.stdout.write(
          `\r  Progress: ${success}/${chunks.length} chunks embedded`,
        );

        // Rate limit: 1 request/100ms
        await new Promise((r) => setTimeout(r, 120));
      } catch (err) {
        console.error(`\n  ❌ Chunk ${i} failed: ${err.message}`);
      }
    }

    totalChunks += success;
    console.log(
      `\n  ✅ Done: ${success}/${chunks.length} chunks for "${kf.title}"\n`,
    );
  }

  console.log('🔍 Syncing database records to RAG Queue...');
  await syncDatabaseToRag();

  // Create HNSW index for fast search (if not exists)
  console.log('\n🔍 Creating vector index...');
  try {
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS knowledge_chunk_embedding_idx
      ON "KnowledgeChunk"
      USING hnsw (embedding vector_cosine_ops)
    `;
    console.log('  ✓ HNSW index created\n');
  } catch (e) {
    console.warn(`  ⚠ Index: ${e.message}\n`);
  }

  console.log(
    `\n🎉 Seeding complete! Total markdown chunks ingested: ${totalChunks}`,
  );
  console.log('The database records have been queued for processing.');
  console.log(
    'The RAG chatbot knowledge base will be fully ready once the queue finishes.\n',
  );

  await prisma.$disconnect();
  await ragQueue.close();
}

async function syncDatabaseToRag() {
  const schools = await prisma.school.findMany({ select: { id: true } });
  for (const s of schools)
    await ragQueue.add('sync_record', { model: 'School', id: s.id });

  const partners = await prisma.partner.findMany({ select: { id: true } });
  for (const p of partners)
    await ragQueue.add('sync_record', { model: 'Partner', id: p.id });

  const courses = await prisma.course.findMany({ select: { id: true } });
  for (const c of courses)
    await ragQueue.add('sync_record', { model: 'Course', id: c.id });

  const members = await prisma.leadershipMember.findMany({
    select: { id: true },
  });
  for (const m of members)
    await ragQueue.add('sync_record', { model: 'LeadershipMember', id: m.id });

  console.log(
    `  ✓ Queued ${schools.length} Schools, ${partners.length} Partners, ${courses.length} Programs, and ${members.length} Team Members.`,
  );
}

main().catch((e) => {
  console.error('Fatal error:', e);
  prisma.$disconnect();
  process.exit(1);
});

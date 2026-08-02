import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  // Models that we want to track and automatically sync to the RAG vector store
  private readonly RAG_TRACKED_MODELS = [
    'School',
    'Partner',
    'Course',
    'LeadershipMember',
  ];

  constructor(@InjectQueue('rag') private readonly ragQueue: Queue) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('neon.tech') ? true : undefined,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();

    const ragQueue = this.ragQueue;
    const trackedModels = this.RAG_TRACKED_MODELS;

    const extended = this.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            const result = await query(args);

            // Hook into write operations for tracked models
            if (model && trackedModels.includes(model)) {
              if (['create', 'update', 'upsert'].includes(operation)) {
                let id = (result as any)?.id;
                if (!id && (args as any)?.where?.id)
                  id = (args as any).where.id;
                if (id) {
                  await ragQueue.add(
                    'sync_record',
                    { model, id },
                    { removeOnComplete: true, removeOnFail: 100 },
                  );
                }
              } else if (operation === 'delete') {
                let id = (result as any)?.id;
                if (!id && (args as any)?.where?.id)
                  id = (args as any).where.id;
                if (id) {
                  await ragQueue.add(
                    'delete_record',
                    { model, id },
                    { removeOnComplete: true, removeOnFail: 100 },
                  );
                }
              }
            }

            return result;
          },
        },
      },
    });

    Object.assign(this, extended);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

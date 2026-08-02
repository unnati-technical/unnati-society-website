import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IngestService } from './ingest.service';

export interface SyncJobData {
  model: string;
  id: string;
}

@Processor('rag', {
  concurrency: 1, // Ensure sequential processing to avoid rate limiting
})
@Injectable()
export class RagProcessor extends WorkerHost {
  private readonly logger = new Logger(RagProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly ingest: IngestService,
  ) {
    super();
  }

  async process(job: Job<SyncJobData, any, string>): Promise<any> {
    const { name, data } = job;
    this.logger.log(`Processing RAG job: ${name} for ${data.model}:${data.id}`);

    if (name === 'sync_record') {
      return this.handleSync(data.model, data.id);
    } else if (name === 'delete_record') {
      return this.handleDelete(data.model, data.id);
    }

    throw new Error(`Unknown job name: ${name}`);
  }

  private async handleDelete(model: string, id: string) {
    const source = `db:${model}:${id}`;
    // Find documents by source and delete them
    const docs = await this.prisma.knowledgeDocument.findMany({
      where: { source },
    });
    for (const doc of docs) {
      await this.ingest.deleteDocument(doc.id);
    }
  }

  private async handleSync(model: string, id: string) {
    const source = `db:${model}:${id}`;
    let title = '';
    let content = '';
    let type = 'database_record';

    switch (model) {
      case 'School': {
        const school = await this.prisma.school.findUnique({ where: { id } });
        if (!school || school.status !== 'Active') {
          await this.handleDelete(model, id);
          return;
        }
        title = `School: ${school.name}`;
        type = 'school';
        content = `
Name: ${school.name}
Category: ${school.schoolCategory} - ${school.schoolType}
Location: ${school.city}, ${school.district}
Address: ${school.address}
Affiliation: ${school.affiliation}
Established: ${school.establishedYear}
About: ${school.about}
Focus Areas: ${school.focusAreas.join(', ')}
Programs Available: ${school.programs.join(', ')}
Students: ${school.studentsCount}, Teachers: ${school.teachersCount}
`.trim();
        break;
      }

      case 'Partner': {
        const partner = await this.prisma.partner.findUnique({ where: { id } });
        if (!partner || partner.status !== 'Active') {
          await this.handleDelete(model, id);
          return;
        }
        title = `Partner: ${partner.organization}`;
        type = 'partner';
        content = `
Organization: ${partner.organization}
Type: ${partner.type}
Focus Area: ${partner.focusArea}
Location: ${partner.city}
Address: ${partner.address}
About: ${partner.about}
Highlights: ${partner.highlights.join(', ')}
`.trim();
        break;
      }

      case 'Course': {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course) {
          await this.handleDelete(model, id);
          return;
        }
        title = `Program: ${course.title}`;
        type = 'program';
        content = `
Program Title: ${course.title}
Description: ${course.description}
`.trim();
        break;
      }

      case 'LeadershipMember': {
        const member = await this.prisma.leadershipMember.findUnique({
          where: { id },
          include: { section: true },
        });
        if (!member || !member.isPublished) {
          await this.handleDelete(model, id);
          return;
        }
        title = `Team Member: ${member.fullName}`;
        type = 'person';
        content = `
Name: ${member.fullName}
Role / Designation: ${member.designation}
Section: ${member.section?.name || 'General'}
Department: ${member.department || 'N/A'}
Biography: ${member.bio || ''}
`.trim();
        break;
      }

      default:
        this.logger.warn(`Unsupported model for RAG sync: ${model}`);
        return;
    }

    if (!content) {
      return;
    }

    // Ingest via IngestService
    await this.ingest.ingestDocument({
      title,
      content,
      source,
      type,
    });
  }

  @OnWorkerEvent('error')
  onError(err: Error) {
    this.logger.error(`BullMQ worker error: ${err.message}`, err.stack);
  }
}

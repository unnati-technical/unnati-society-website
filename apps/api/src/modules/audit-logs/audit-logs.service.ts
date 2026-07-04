import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async logAction(data: {
    userId?: string;
    userEmail?: string;
    action: string;
    entity: string;
    entityId?: string;
    previousData?: string;
    updatedData?: string;
    ipAddress?: string;
  }) {
    return this.prisma.auditLog.create({
      data,
    });
  }

  async getLogs(query: any) {
    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

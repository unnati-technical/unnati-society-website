import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ImageKitService } from '../imagekit/imagekit.service';
import { UpsertLeaderboardEntryDto } from './upsert-leaderboard-entry.dto';

@Injectable()
export class VolunteerLeaderboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imagekitService: ImageKitService,
  ) {}

  async findAll(month?: string) {
    if (month) {
      return this.prisma.volunteerLeaderboard.findMany({
        where: { month },
        orderBy: { rank: 'asc' },
      });
    }
    return this.prisma.volunteerLeaderboard.findMany({
      orderBy: [{ month: 'desc' }, { rank: 'asc' }],
    });
  }

  async getMonths() {
    const results = await this.prisma.volunteerLeaderboard.findMany({
      select: { month: true },
      distinct: ['month'],
    });

    const months = results.map((r) => r.month).filter((m) => m !== 'ALL_TIME');

    // Sort months descending (e.g., "2026-08", "2026-07")
    months.sort((a, b) => b.localeCompare(a));

    return months;
  }

  async upsert(dto: UpsertLeaderboardEntryDto, file?: Express.Multer.File) {
    const rankNum = Number(dto.rank);
    const workshopsNum = Number(dto.workshops || 0);
    const hoursNum = Number(dto.hours || 0);

    const existing = await this.prisma.volunteerLeaderboard.findUnique({
      where: {
        month_rank: {
          month: dto.month,
          rank: rankNum,
        },
      },
    });

    let avatarUrl = existing?.avatar || null;
    if (file) {
      const uploadResult = await this.imagekitService.uploadFile(
        file,
        'leaderboard',
      );
      avatarUrl = uploadResult.url;
    }

    return this.prisma.volunteerLeaderboard.upsert({
      where: {
        month_rank: {
          month: dto.month,
          rank: rankNum,
        },
      },
      update: {
        name: dto.name,
        role: dto.role,
        avatar: avatarUrl,
        workshops: workshopsNum,
        hours: hoursNum,
        linkedin: dto.linkedin || null,
        instagram: dto.instagram || null,
      },
      create: {
        month: dto.month,
        rank: rankNum,
        name: dto.name,
        role: dto.role,
        avatar: avatarUrl,
        workshops: workshopsNum,
        hours: hoursNum,
        linkedin: dto.linkedin || null,
        instagram: dto.instagram || null,
      },
    });
  }

  async remove(id: string) {
    const entry = await this.prisma.volunteerLeaderboard.findUnique({
      where: { id },
    });
    if (!entry) {
      throw new NotFoundException('Leaderboard entry not found');
    }

    return this.prisma.volunteerLeaderboard.delete({
      where: { id },
    });
  }

  async removeMonth(month: string) {
    return this.prisma.volunteerLeaderboard.deleteMany({
      where: { month },
    });
  }

  async getActiveMonth() {
    const activeEntry = await this.prisma.volunteerLeaderboard.findFirst({
      where: { isActive: true },
      select: { month: true },
    });
    return activeEntry ? activeEntry.month : null;
  }

  async setMonthActive(month: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.volunteerLeaderboard.updateMany({
        data: { isActive: false },
      });
      return tx.volunteerLeaderboard.updateMany({
        where: { month },
        data: { isActive: true },
      });
    });
  }
}

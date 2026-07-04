import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class LeadershipRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getFullLeadershipData() {
    return this.prisma.leadershipYear.findMany({
      orderBy: { year: 'desc' },
      include: {
        sections: {
          orderBy: { displayOrder: 'asc' },
          include: {
            members: {
              orderBy: { displayOrder: 'asc' },
            },
          },
        },
      },
    });
  }

  async getYearByString(year: string) {
    return this.prisma.leadershipYear.findUnique({
      where: { year },
      include: {
        sections: {
          orderBy: { displayOrder: 'asc' },
          include: {
            members: {
              orderBy: { displayOrder: 'asc' },
            },
          },
        },
      },
    });
  }

  async getYearById(id: string) {
    return this.prisma.leadershipYear.findUnique({
      where: { id },
      include: {
        sections: {
          include: { members: true },
        },
      },
    });
  }

  async createYear(data: any) {
    return this.prisma.leadershipYear.create({ data });
  }

  async updateYear(id: string, data: any) {
    return this.prisma.leadershipYear.update({ where: { id }, data });
  }

  async deleteYear(id: string) {
    return this.prisma.leadershipYear.delete({ where: { id } });
  }

  async setYearActive(id: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.leadershipYear.updateMany({ data: { isActive: false } });
      return tx.leadershipYear.update({ where: { id }, data: { isActive: true } });
    });
  }

  // Section
  async createSection(data: any) {
    return this.prisma.leadershipSection.create({ data });
  }

  async updateSection(id: string, data: any) {
    return this.prisma.leadershipSection.update({ where: { id }, data });
  }

  async deleteSection(id: string) {
    return this.prisma.leadershipSection.delete({ where: { id } });
  }

  // Member
  async createMember(data: any) {
    return this.prisma.leadershipMember.create({ data });
  }

  async updateMember(id: string, data: any) {
    return this.prisma.leadershipMember.update({ where: { id }, data });
  }

  async deleteMember(id: string) {
    return this.prisma.leadershipMember.delete({ where: { id } });
  }

  // Transactions
  async duplicateYearTransaction(targetYear: string, sourceSections: any[]) {
    // using interactive transaction for duplicating a year and its nested children
    return this.prisma.$transaction(async (tx) => {
      const newYear = await tx.leadershipYear.create({
        data: { year: targetYear, isActive: true },
      });

      for (const section of sourceSections) {
        const newSection = await tx.leadershipSection.create({
          data: {
            yearId: newYear.id,
            name: section.name,
            slug: section.slug,
            badgeColor: section.badgeColor,
            displayOrder: section.displayOrder,
            isVisible: section.isVisible,
          },
        });

        for (const member of section.members) {
          await tx.leadershipMember.create({
            data: {
              sectionId: newSection.id,
              fullName: member.fullName,
              designation: member.designation,
              department: member.department,
              bio: member.bio,
              profileImage: member.profileImage,
              linkedin: member.linkedin,
              instagram: member.instagram,
              email: member.email,
              displayOrder: member.displayOrder,
              isPublished: member.isPublished,
            },
          });
        }
      }
    });
  }
}

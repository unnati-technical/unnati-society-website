import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadershipRepository } from './repositories/leadership.repository';
import { ImageKitService } from '../imagekit/imagekit.service';
import {
  CreateLeadershipYearDto,
  DuplicateYearDto,
  CreateLeadershipSectionDto,
  CreateLeadershipMemberDto,
  ReorderItemsDto,
} from './dto/leadership.dto';

@Injectable()
export class LeadershipService {
  constructor(
    private readonly leadershipRepository: LeadershipRepository,
    private readonly imagekitService: ImageKitService,
  ) {}

  // Note: ImageKit does not embed fileId in the URL like Cloudinary embeds publicId.
  // For now, old image deletion is a no-op. Future uploads will store fileId alongside URL.

  async getLeadershipData() {
    return this.leadershipRepository.getFullLeadershipData();
  }

  async getYearData(year: string) {
    const data = await this.leadershipRepository.getYearByString(year);
    if (!data) throw new NotFoundException(`Year ${year} not found`);
    return data;
  }

  async createYear(data: CreateLeadershipYearDto) {
    return this.leadershipRepository.createYear({
      year: data.year,
      isActive: true,
    });
  }

  async duplicateYear(data: DuplicateYearDto) {
    const sourceYear = await this.leadershipRepository.getYearById(
      data.sourceYearId,
    );

    if (!sourceYear) throw new NotFoundException('Source year not found');

    await this.leadershipRepository.duplicateYearTransaction(
      data.targetYear,
      sourceYear.sections,
    );

    return this.getLeadershipData();
  }

  async archiveYear(id: string) {
    return this.leadershipRepository.updateYear(id, { isActive: false });
  }

  async setYearActive(id: string) {
    return this.leadershipRepository.setYearActive(id);
  }

  async createSection(data: any) {
    return this.leadershipRepository.createSection({
      yearId: data.yearId,
      name: data.name,
      slug: data.slug,
      badgeColor: data.badgeColor ?? 'blue',
      displayOrder: data.displayOrder ?? 0,
      isVisible: data.isVisible ?? true,
    });
  }

  async updateSection(id: string, data: any) {
    const updateData: any = {};
    const allowed = ['name', 'slug', 'badgeColor', 'displayOrder', 'isVisible'];
    for (const key of allowed) {
      if (key in data) updateData[key] = data[key];
    }
    return this.leadershipRepository.updateSection(id, updateData);
  }

  async deleteSection(id: string) {
    try {
      return await this.leadershipRepository.deleteSection(id);
    } catch (e: any) {
      if (e?.code === 'P2025') return { success: true };
      throw e;
    }
  }

  async createMember(data: any) {
    return this.leadershipRepository.createMember({
      sectionId: data.sectionId,
      fullName: data.fullName,
      designation: data.designation,
      department: data.department ?? null,
      bio: data.bio ?? null,
      profileImage: data.profileImage ?? null,
      linkedin: data.linkedin ?? null,
      instagram: data.instagram ?? null,
      email: data.email ?? null,
      displayOrder: data.displayOrder ?? 0,
      isPublished: data.isPublished ?? true,
    });
  }

  async updateMember(id: string, data: any) {
    const updateData: any = {};
    const allowed = [
      'fullName',
      'designation',
      'department',
      'bio',
      'profileImage',
      'linkedin',
      'instagram',
      'email',
      'displayOrder',
      'isPublished',
      'sectionId',
    ];
    for (const key of allowed) {
      if (key in data) updateData[key] = data[key];
    }
    try {
      if (updateData.profileImage !== undefined) {
        // Note: Old ImageKit images will be orphaned for now if replaced,
        // since we only store URLs in the DB, not fileIds.
      }
      return await this.leadershipRepository.updateMember(id, updateData);
    } catch (e: any) {
      if (e?.code === 'P2025')
        return { success: false, error: 'Member not found' };
      throw e;
    }
  }

  async deleteMember(id: string) {
    try {
      const existing = await this.leadershipRepository.getMemberById(id);
      // Note: ImageKit file deletion requires fileId, but we only have URL.
      // Old files will remain orphaned for now.
      return await this.leadershipRepository.deleteMember(id);
    } catch (e: any) {
      if (e?.code === 'P2025') {
        // Record already deleted, ignore
        return { success: true };
      }
      console.error('Failed to delete member:', e);
      throw e;
    }
  }

  async reorderSections(items: { id: string; displayOrder: number }[]) {
    // We use a sequential loop instead of a transaction to prevent Prisma P2028
    // connection pool/lock exhaustion timeouts when users drag-and-drop rapidly.
    for (const item of items) {
      try {
        await this.leadershipRepository.updateSection(item.id, {
          displayOrder: item.displayOrder,
        });
      } catch (e: any) {
        if (e?.code !== 'P2025') throw e;
      }
    }
    return { success: true };
  }

  async reorderMembers(
    items: { id: string; sectionId?: string; displayOrder: number }[],
  ) {
    // We use a sequential loop instead of a transaction to prevent Prisma P2028
    // connection pool/lock exhaustion timeouts when users drag-and-drop rapidly.
    for (const item of items) {
      try {
        await this.leadershipRepository.updateMember(item.id, {
          displayOrder: item.displayOrder,
          sectionId: item.sectionId,
        });
      } catch (e: any) {
        if (e?.code !== 'P2025') throw e;
      }
    }
    return { success: true };
  }
}
// Trigger rebuild after Prisma generate

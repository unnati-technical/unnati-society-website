import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ImageKitService } from '../imagekit/imagekit.service';

@Injectable()
export class HomeMediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imagekitService: ImageKitService,
  ) {}

  async findAll() {
    return this.prisma.homeMedia.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  async create(
    data: {
      type: string;
      title?: string;
      subtitle?: string;
      displayOrder?: number;
      url?: string;
    },
    file?: Express.Multer.File,
  ) {
    let mediaUrl = data.url || '';

    if (file) {
      const uploadResult = await this.imagekitService.uploadFile(
        file,
        'home_media',
      );
      mediaUrl = uploadResult.url;
    }

    const displayOrder = data.displayOrder ? Number(data.displayOrder) : 0;

    return this.prisma.homeMedia.create({
      data: {
        type: data.type,
        url: mediaUrl,
        title: data.title || null,
        subtitle: data.subtitle || null,
        displayOrder,
      },
    });
  }

  async update(
    id: string,
    data: {
      type?: string;
      title?: string;
      subtitle?: string;
      displayOrder?: number;
      url?: string;
    },
  ) {
    const existing = await this.prisma.homeMedia.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Home media item not found');
    }

    const updateData: any = {};
    if (data.type !== undefined) updateData.type = data.type;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
    if (data.url !== undefined) updateData.url = data.url;
    if (data.displayOrder !== undefined) {
      updateData.displayOrder = Number(data.displayOrder);
    }

    return this.prisma.homeMedia.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.homeMedia.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Home media item not found');
    }

    return this.prisma.homeMedia.delete({
      where: { id },
    });
  }
}

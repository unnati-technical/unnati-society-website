import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.adminUser.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async verifyAdmin(email: string) {
    if (email === 'unnati.ir@iiitbh.ac.in' || email.toLowerCase() === 'rinku4578914@gmail.com') {
      return { isAuthorized: true };
    }

    const admin = await this.prisma.adminUser.findUnique({
      where: { email },
    });

    return { isAuthorized: !!admin };
  }

  async create(email: string, name: string) {
    if (email === 'unnati.ir@iiitbh.ac.in' || email.toLowerCase() === 'rinku4578914@gmail.com') {
      throw new BadRequestException(
        'This email is a protected Super Admin and cannot be modified.',
      );
    }

    const existing = await this.prisma.adminUser.findUnique({
      where: { email },
    });

    if (existing) {
      throw new BadRequestException('Admin with this email already exists.');
    }

    return this.prisma.adminUser.create({
      data: {
        email,
        name: name || 'Admin',
      },
    });
  }

  async remove(id: string) {
    const admin = await this.prisma.adminUser.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException('Admin user not found');
    }

    if (admin.email === 'unnati.ir@iiitbh.ac.in' || admin.email.toLowerCase() === 'rinku4578914@gmail.com') {
      throw new BadRequestException('Cannot delete a protected Super Admin.');
    }

    return this.prisma.adminUser.delete({
      where: { id },
    });
  }
}

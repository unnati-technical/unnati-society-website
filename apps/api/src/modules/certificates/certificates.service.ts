import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async createCertificate(data: {
    referenceNo: string;
    recipientName: string;
    rollNo?: string;
    team?: string;
    batch?: string;
    appreciationType: string;
    bodyText?: string;
    pdfUrl?: string;
  }) {
    // If the reference number already exists, just return the existing certificate.
    // This allows re-downloading the same certificate.
    const existing = await this.prisma.certificate.findUnique({
      where: { referenceNo: data.referenceNo }
    });
    if (existing) {
      // Update it with the latest data in case they fixed a typo
      return this.prisma.certificate.update({
        where: { id: existing.id },
        data
      });
    }

    try {
      const certificate = await this.prisma.certificate.create({
        data,
      });
      return certificate;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Certificate with reference number ${data.referenceNo} already exists.`);
        }
      }
      throw error;
    }
  }

  async getCertificate(id: string) {
    const certificate = await this.prisma.certificate.findUnique({
      where: { id },
    });

    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found.`);
    }

    return certificate;
  }
}

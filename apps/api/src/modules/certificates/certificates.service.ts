import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
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
    const existing = await this.prisma.certificate.findUnique({
      where: { referenceNo: data.referenceNo },
    });
    if (existing) {
      throw new ConflictException(
        `Certificate with reference number ${data.referenceNo} already exists.`,
      );
    }

    try {
      const certificate = await this.prisma.certificate.create({
        data,
      });
      return certificate;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Certificate with reference number ${data.referenceNo} already exists.`,
          );
        }
      }
      throw error;
    }
  }

  async createCertificatesBulk(
    data: {
      referenceNo: string;
      recipientName: string;
      rollNo?: string;
      team?: string;
      batch?: string;
      appreciationType: string;
      bodyText?: string;
      pdfUrl?: string;
    }[],
  ) {
    const results: any[] = [];
    const errors: string[] = [];
    if (!Array.isArray(data)) return results;

    for (const item of data) {
      const safeItem = {
        referenceNo: item.referenceNo ? String(item.referenceNo) : '',
        recipientName: item.recipientName ? String(item.recipientName) : '',
        rollNo: item.rollNo ? String(item.rollNo) : undefined,
        team: item.team ? String(item.team) : undefined,
        batch: item.batch ? String(item.batch) : undefined,
        appreciationType: item.appreciationType
          ? String(item.appreciationType)
          : 'OF APPRECIATION',
        bodyText: item.bodyText ? String(item.bodyText) : undefined,
        pdfUrl: item.pdfUrl ? String(item.pdfUrl) : undefined,
      };

      try {
        const cert = await this.createCertificate(safeItem);
        results.push(cert);
      } catch (err: any) {
        if (err instanceof ConflictException) {
          errors.push(safeItem.referenceNo);
        }
        console.error(`Failed to create cert for ${item.referenceNo}:`, err);
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException(
        `The following reference numbers already exist: ${errors.join(', ')}`,
      );
    }

    return results;
  }

  async getAllCertificates() {
    return this.prisma.certificate.findMany({
      orderBy: { issuedAt: 'desc' },
    });
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

  async updateCertificate(id: string, data: any) {
    // Make sure it exists
    await this.getCertificate(id);
    return this.prisma.certificate.update({
      where: { id },
      data,
    });
  }

  async deleteCertificate(id: string) {
    await this.getCertificate(id);
    return this.prisma.certificate.delete({
      where: { id },
    });
  }

  async bulkDeleteCertificates(ids: string[]) {
    if (!ids || ids.length === 0) return { count: 0 };
    return this.prisma.certificate.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async getCertificateByRef(referenceNo: string) {
    const certificate = await this.prisma.certificate.findUnique({
      where: { referenceNo },
    });

    if (!certificate) {
      throw new NotFoundException(
        `Certificate with reference ${referenceNo} not found.`,
      );
    }

    return certificate;
  }
}

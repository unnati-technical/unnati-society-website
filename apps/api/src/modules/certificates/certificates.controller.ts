import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post()
  async createCertificate(
    @Body()
    data: {
      referenceNo: string;
      recipientName: string;
      rollNo?: string;
      team?: string;
      batch?: string;
      appreciationType: string;
      bodyText?: string;
      pdfUrl?: string;
    },
  ) {
    return this.certificatesService.createCertificate(data);
  }

  @Public()
  @Get(':id')
  async getCertificate(@Param('id') id: string) {
    return this.certificatesService.getCertificate(id);
  }
}

import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
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
  @UseGuards(FirebaseAuthGuard)
  @Post('bulk')
  async createCertificatesBulk(@Body() data: any[]) {
    return this.certificatesService.createCertificatesBulk(data);
  }

  @Public()
  @Get('verify')
  async verifyCertificate(@Query('ref') ref: string) {
    return this.certificatesService.getCertificateByRef(ref);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getAllCertificates() {
    return this.certificatesService.getAllCertificates();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('bulk-delete')
  async bulkDeleteCertificates(@Body('ids') ids: string[]) {
    return this.certificatesService.bulkDeleteCertificates(ids);
  }

  @Public()
  @Get(':id')
  async getCertificate(@Param('id') id: string) {
    return this.certificatesService.getCertificate(id);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post(':id')
  async updateCertificate(@Param('id') id: string, @Body() data: any) {
    return this.certificatesService.updateCertificate(id, data);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post(':id/delete')
  async deleteCertificate(@Param('id') id: string) {
    return this.certificatesService.deleteCertificate(id);
  }
}

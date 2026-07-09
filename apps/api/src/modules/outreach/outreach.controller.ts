import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OutreachService } from './outreach.service';
import { CreateOutreachDto } from './dto/create-outreach.dto';
import { CreateCampusVisitDto } from './dto/create-campus-visit.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('outreach')
export class OutreachController {
  constructor(private readonly outreachService: OutreachService) {}

  @Public()
  @Post('invite')
  invite(@Body() dto: CreateOutreachDto) {
    return this.outreachService.invite(dto);
  }

  @Public()
  @Post('campus-visit')
  campusVisit(@Body() dto: CreateCampusVisitDto) {
    return this.outreachService.campusVisit(dto);
  }

  @Public()
  @Post('partner')
  @UseInterceptors(FileInterceptor('file'))
  partner(
    @Body() dto: CreatePartnerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (typeof dto.areasOfInterest === 'string') {
      try {
        dto.areasOfInterest = JSON.parse(dto.areasOfInterest);
      } catch (e) {
        dto.areasOfInterest = [];
      }
    }
    return this.outreachService.partner(dto, file);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get('invites')
  findAllInvites() {
    return this.outreachService.findAllInvites();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get('campus-visits')
  findAllCampusVisits() {
    return this.outreachService.findAllCampusVisits();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get('partner-requests')
  findAllPartnerRequests() {
    return this.outreachService.findAllPartnerRequests();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch('invite/:id/status')
  updateInviteStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.outreachService.updateInviteStatus(id, status);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch('campus-visit/:id/status')
  updateCampusVisitStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.outreachService.updateCampusVisitStatus(id, status);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch('partner-request/:id/status')
  updatePartnerStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.outreachService.updatePartnerStatus(id, status);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch('partner-request/:id/notes')
  updatePartnerNotes(@Param('id') id: string, @Body('notes') notes: string) {
    return this.outreachService.updatePartnerNotes(id, notes);
  }

  // --- DELETE ROUTES ---

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Delete('invite/:id')
  deleteInvite(@Param('id') id: string) {
    return this.outreachService.deleteInvite(id);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('invite/bulk-delete')
  bulkDeleteInvites(@Body('ids') ids: string[]) {
    return this.outreachService.bulkDeleteInvites(ids);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Delete('campus-visit/:id')
  deleteCampusVisit(@Param('id') id: string) {
    return this.outreachService.deleteCampusVisit(id);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('campus-visit/bulk-delete')
  bulkDeleteCampusVisits(@Body('ids') ids: string[]) {
    return this.outreachService.bulkDeleteCampusVisits(ids);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Delete('partner-request/:id')
  deletePartnerRequest(@Param('id') id: string) {
    return this.outreachService.deletePartnerRequest(id);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('partner-request/bulk-delete')
  bulkDeletePartnerRequests(@Body('ids') ids: string[]) {
    return this.outreachService.bulkDeletePartnerRequests(ids);
  }
}

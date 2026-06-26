import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OutreachService } from './outreach.service';
import { CreateOutreachDto } from './dto/create-outreach.dto';
import { CreateCampusVisitDto } from './dto/create-campus-visit.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { Public } from '../auth/decorators/public.decorator';

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
}

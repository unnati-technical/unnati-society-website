import { Controller, Post, Body } from '@nestjs/common';
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
  partner(@Body() dto: CreatePartnerDto) {
    return this.outreachService.partner(dto);
  }
}

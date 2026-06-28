import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { TeamLeadsService } from './team-leads.service';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('team-leads')
export class TeamLeadsController {
  constructor(private readonly teamLeadsService: TeamLeadsService) {}

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    // req.user is the decoded Firebase token
    const email = req.user.email;
    const leads = await this.teamLeadsService.findAll();
    const myProfile = leads.find(
      (l) => l.email === email || l.loginEmail === email,
    );
    if (!myProfile) {
      throw new NotFoundException('Team Lead profile not found for this user.');
    }
    return myProfile;
  }

  @Public()
  @Get()
  async findAll() {
    const leads = await this.teamLeadsService.findAll();
    const stats = await this.teamLeadsService.getDashboardStats();
    const accessStats = await this.teamLeadsService.getMsgAccessStats();
    const activityLogs = await this.teamLeadsService.getRecentActivity();

    return {
      leads,
      stats,
      accessStats,
      activityLogs,
    };
  }

  @Public()
  @Post()
  create(
    @Body()
    data: {
      name: string;
      email: string;
      phone: string;
      position: string;
      msgAccess: string;
    },
  ) {
    return this.teamLeadsService.create(data);
  }

  @Public()
  @Post('apply')
  apply(@Body() data: { name: string; email: string; phone: string }) {
    return this.teamLeadsService.apply(data);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.teamLeadsService.update(id, data);
  }

  @Public()
  @Post(':id/generate-password')
  generatePassword(@Param('id') id: string) {
    return this.teamLeadsService.generatePassword(id);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamLeadsService.remove(id);
  }
}

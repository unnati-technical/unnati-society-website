import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('analytics')
@Public()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('kpis')
  async getKpis() {
    return this.analyticsService.getKpis();
  }

  @Get('pending-approvals')
  async getPendingApprovals() {
    return this.analyticsService.getPendingApprovals();
  }

  @Get('recent-activities')
  async getRecentActivities() {
    return this.analyticsService.getRecentActivities();
  }
}

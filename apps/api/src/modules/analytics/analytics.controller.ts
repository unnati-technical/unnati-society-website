import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
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

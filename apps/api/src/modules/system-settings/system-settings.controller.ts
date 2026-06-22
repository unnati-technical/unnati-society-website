import { Controller, Get, Post, Body } from '@nestjs/common';
import { SystemSettingsService } from './system-settings.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('system-settings')
export class SystemSettingsController {
  constructor(private readonly settingsService: SystemSettingsService) {}

  @Public()
  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Public()
  @Post()
  async updateSettings(@Body() body: Record<string, string>) {
    return this.settingsService.updateSettings(body);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class SystemSettingsService {
  private readonly logger = new Logger(SystemSettingsService.name);

  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getSettings() {
    const settings = await this.prisma.systemSetting.findMany();
    const result: Record<string, string> = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });
    return result;
  }

  async getSetting(key: string, defaultValue?: string): Promise<string> {
    const cached = await this.cacheManager.get<string>(`setting_${key}`);
    if (cached) return cached;

    const setting = await this.prisma.systemSetting.findUnique({
      where: { key },
    });

    const value = setting ? setting.value : defaultValue || '';
    if (setting) {
      await this.cacheManager.set(`setting_${key}`, value, 3600000); // 1 hour cache
    }
    return value;
  }

  async updateSettings(settings: Record<string, string>) {
    const updates = Object.entries(settings).map(async ([key, value]) => {
      await this.prisma.systemSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
      // Invalidate cache
      await this.cacheManager.del(`setting_${key}`);
    });

    await Promise.all(updates);
    this.logger.log(
      `System settings updated: ${Object.keys(settings).join(', ')}`,
    );
    return { success: true };
  }
}

import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../../prisma/prisma.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Check database connection with serverless wake-up allowance
      () => this.prismaHealth.pingCheck('database', this.prisma, { timeout: 5000 }),
      // Check the official public website
      () =>
        this.http.pingCheck(
          'public-web',
          process.env.FRONTEND_URL || 'https://unnati.iiitbh.ac.in',
        ),
    ]);
  }
}

import 'dotenv/config';
import { Module } from '@nestjs/common';
import { NotificationRecipientsModule } from './modules/notification-recipients/notification-recipients.module';
import { SystemSettingsModule } from './modules/system-settings/system-settings.module';
import { TeamLeadsModule } from './modules/team-leads/team-leads.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { BullModule } from '@nestjs/bullmq';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import Redis from 'ioredis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VolunteersModule } from './modules/volunteers/volunteers.module';
import { OutreachModule } from './modules/outreach/outreach.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { StudentsModule } from './modules/students/students.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { EventsModule } from './modules/events/events.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { DonationsModule } from './modules/donations/donations.module';
import { MediaModule } from './modules/media/media.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EmailModule } from './queues/email/email.module';
import { CertificateModule } from './queues/certificate/certificate.module';
import { NotificationModule } from './queues/notification/notification.module';
import { ReportModule } from './queues/report/report.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { ContactModule } from './modules/contact/contact.module';

// Config for BullMQ (job queues) - requires maxRetriesPerRequest: null
const bullRedisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  tls:
    process.env.REDIS_TLS === 'true'
      ? { rejectUnauthorized: false }
      : undefined,
  maxRetriesPerRequest: null, // Required for BullMQ
  retryStrategy: (times: number) => {
    if (times > 3) return null;
    return Math.min(times * 500, 2000);
  },
};

// Config for Throttler/Cache (general ioredis)
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  tls:
    process.env.REDIS_TLS === 'true'
      ? { rejectUnauthorized: false }
      : undefined,
  connectTimeout: 10000,
  retryStrategy: (times: number) => {
    if (times > 3) return null;
    return Math.min(times * 500, 2000);
  },
};

@Module({
  imports: [
    BullModule.forRoot({
      connection: bullRedisConfig,
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers: [{ ttl: 60000, limit: 100 }],
        // Temporarily commented out Redis storage due to flaky connections on mobile hotspot
        // which causes 500 Internal Server Errors on all routes when Redis disconnects.
        // Falls back to default Memory Storage.
        // storage: new ThrottlerStorageRedisService(
        //   new Redis({
        //     ...redisConfig,
        //     lazyConnect: true,
        //   })
        // ),
      }),
    }),
    CacheModule.register({
      isGlobal: true,
      // Temporarily removed KeyvRedis to prevent 500 errors when connection drops on mobile hotspot.
    }),
    AuthModule,
    UsersModule,
    VolunteersModule,
    OutreachModule,
    SchoolsModule,
    StudentsModule,
    ProgramsModule,
    EventsModule,
    CertificatesModule,
    DonationsModule,
    MediaModule,
    AnalyticsModule,
    NotificationsModule,
    EmailModule,
    CertificateModule,
    NotificationModule,
    ReportModule,
    PrismaModule,
    ContactModule,
    NotificationRecipientsModule,
    SystemSettingsModule,
    TeamLeadsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

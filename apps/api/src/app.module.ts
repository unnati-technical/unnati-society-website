import 'dotenv/config';
import { randomUUID } from 'crypto';
import { Module } from '@nestjs/common';
import { NotificationRecipientsModule } from './modules/notification-recipients/notification-recipients.module';
import { SystemSettingsModule } from './modules/system-settings/system-settings.module';
import { TeamLeadsModule } from './modules/team-leads/team-leads.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuditLogInterceptor } from './interceptors/audit-log.interceptor';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { BullModule } from '@nestjs/bullmq';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VolunteersModule } from './modules/volunteers/volunteers.module';
import { OutreachModule } from './modules/outreach/outreach.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { PartnersModule } from './modules/partners/partners.module';
import { StudentsModule } from './modules/students/students.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { EventsModule } from './modules/events/events.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { DonationsModule } from './modules/donations/donations.module';
import { MediaModule } from './modules/media/media.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EmailModule } from './queues/email/email.module';
import { SubscribersModule } from './modules/subscribers/subscribers.module';
import { CertificateModule } from './queues/certificate/certificate.module';
import { NotificationModule } from './queues/notification/notification.module';
import { ReportModule } from './queues/report/report.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { ContactModule } from './modules/contact/contact.module';
import { LeadershipModule } from './modules/leadership/leadership.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { HealthModule } from './modules/health/health.module';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CalendarModule } from './modules/calendar/calendar.module';
import { AdminsModule } from './modules/admins/admins.module';
import { HomeMediaModule } from './modules/home-media/home-media.module';
import { VolunteerLeaderboardModule } from './modules/volunteer-leaderboard/volunteer-leaderboard.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './modules/cron/cron.module';
import { ChatModule } from './modules/chat/chat.module';

// BullMQ Redis config — maxRetriesPerRequest: null is required by BullMQ
// retryStrategy returns null quickly so the app doesn't hang waiting for Redis
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
  lazyConnect: true, // Don't block app startup if Redis is down
  connectTimeout: 5000,
  // Use a sensible retry strategy that doesn't give up immediately.
  // Returning null causes unhandled "Connection is closed" errors when BullMQ tries to use the client.
  retryStrategy: (times) => {
    return Math.max(Math.min(Math.exp(times), 20000), 1000);
  },
};

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
        redact: [
          'req.headers.authorization',
          'req.headers.cookie',
          'req.body.password',
          'req.body.token',
          'req.body.refreshToken',
          'req.body.otp',
          'req.body.apiKey',
          'req.body.aadhaar',
          'req.body.paymentDetails',
        ],
        genReqId: (req) => {
          return req.id || req.headers['x-request-id'] || randomUUID();
        },
      },
    }),

    // BullMQ — lazy connection, gives up immediately if Redis unreachable
    BullModule.forRoot({
      connection: bullRedisConfig,
    }),

    // Throttler — in-memory fallback (no Redis dependency)
    // This means rate limiting is per-process, not distributed, but app works without Redis
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 100 }],
    }),
    ScheduleModule.forRoot(),

    PrometheusModule.register(),

    // Cache — in-memory store as fallback when Redis is unavailable
    // ttl: 60s, max 500 items in memory — safe default for dev/hotspot
    CacheModule.register({
      isGlobal: true,
      ttl: 60000,
      max: 500,
    }),
    AuthModule,
    UsersModule,
    VolunteersModule,
    OutreachModule,
    SchoolsModule,
    PartnersModule,
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
    LeadershipModule,
    AuditLogsModule,
    HealthModule,
    CalendarModule,
    AdminsModule,
    HomeMediaModule,
    VolunteerLeaderboardModule,
    SubscribersModule,
    TeamLeadsModule,
    CronModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bullmq';
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

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    }),
    AuthModule, UsersModule, VolunteersModule, OutreachModule, SchoolsModule, StudentsModule, ProgramsModule, EventsModule, CertificatesModule, DonationsModule, MediaModule, AnalyticsModule, NotificationsModule, EmailModule, CertificateModule, NotificationModule, ReportModule, PrismaModule, ContactModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SystemSettingsService } from '../../modules/system-settings/system-settings.service';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly settingsService: SystemSettingsService) {
    super();
  }

  @OnWorkerEvent('error')
  onError(err: Error) {
    // Just log connection errors quietly instead of crashing the app
    this.logger.error(`Worker error: ${err.message}`);
  }

  private async getTransporter() {
    const smtpHost = await this.settingsService.getSetting(
      'SMTP_HOST',
      process.env.SMTP_HOST || 'smtp.gmail.com',
    );
    const smtpPort = await this.settingsService.getSetting(
      'SMTP_PORT',
      process.env.SMTP_PORT || '587',
    );
    const smtpUser = await this.settingsService.getSetting(
      'SMTP_USER',
      process.env.SMTP_USER || 'hello@unnatibihar.org',
    );
    const smtpPass = await this.settingsService.getSetting(
      'SMTP_PASS',
      process.env.SMTP_PASS || '',
    );

    return nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing email job ${job.id} of type ${job.name}...`);
    try {
      const transporter = await this.getTransporter();
      const mailOptions = job.data;

      const info = await transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error(`Failed to send email job ${job.id}:`, error);
      throw error;
    }
  }
}

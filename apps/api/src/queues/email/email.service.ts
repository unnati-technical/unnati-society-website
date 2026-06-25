import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../prisma/prisma.service';
import { SystemSettingsService } from '../../modules/system-settings/system-settings.service';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly settingsService: SystemSettingsService,
  ) {}

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
      process.env.SMTP_USER || '',
    );
    const smtpPass = await this.settingsService.getSetting(
      'SMTP_PASS',
      process.env.SMTP_PASS || '',
    );

    return nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  async sendContactAutoReply(name: string, email: string) {
    try {
      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting(
        'SMTP_USER',
        process.env.SMTP_USER || '',
      );

      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
        to: email,
        subject: 'Thank you for contacting Unnati Society',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563EB;">Thank you for reaching out, ${name}!</h2>
            <p>We have received your message and our team will get back to you as soon as possible.</p>
            <p>At Unnati Society, we are dedicated to transforming lives through education, and we appreciate your interest in our cause.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The Unnati Society Team</strong></p>
          </div>
        `,
      });
      this.logger.log(`Auto-reply sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send auto-reply to ${email}: ${error.message}`,
      );
    }
  }

  async sendContactAdminNotification(data: {
    name: string;
    email: string;
    subject: string;
    role: string;
    message: string;
  }) {
    try {
      const defaultAdminEmail = await this.settingsService.getSetting(
        'ADMIN_EMAIL',
        process.env.ADMIN_EMAIL || 'admin@unnatisociety.org',
      );

      // Fetch dynamic admin recipients
      const recipients = await this.prisma.notificationRecipient.findMany();
      const adminEmails =
        recipients.length > 0
          ? recipients.map((r) => r.email)
          : [defaultAdminEmail];

      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting(
        'SMTP_USER',
        process.env.SMTP_USER || '',
      );

      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
        to: adminEmails,
        subject: `New Contact Form Submission: ${data.subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #0F172A; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Contact Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Role:</strong> ${data.role}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 15px;">
              <p style="margin: 0;"><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
        `,
      });
      this.logger.log(
        `Admin notification sent to ${adminEmails.join(', ')} for ${data.email}`,
      );
    } catch (error) {
      this.logger.error(`Failed to send admin notification: ${error.message}`);
    }
  }

  async sendAdminReply(params: {
    to: string;
    toName: string;
    originalSubject: string;
    replyText: string;
  }) {
    const transporter = await this.getTransporter();
    const smtpUser = await this.settingsService.getSetting(
      'SMTP_USER',
      process.env.SMTP_USER || '',
    );

    await transporter.sendMail({
      from: `"Unnati Society" <${smtpUser}>`,
      to: params.to,
      subject: `Re: ${params.originalSubject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0B1F5E, #2563EB); padding: 24px 28px;">
            <h2 style="color: white; margin: 0; font-size: 18px;">Reply from Unnati Society</h2>
            <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">Re: ${params.originalSubject}</p>
          </div>
          <div style="padding: 28px;">
            <p style="color: #374151; font-size: 14px; margin: 0 0 8px;">Dear ${params.toName},</p>
            <div style="background: #f8fafc; border-left: 4px solid #2563EB; border-radius: 4px; padding: 16px 20px; margin: 16px 0;">
              <p style="color: #1e293b; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${params.replyText}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #64748b; font-size: 12px; margin: 0;">Best regards,<br/><strong style="color: #0B1F5E;">Unnati Society Team</strong></p>
          </div>
          <div style="background: #f1f5f9; padding: 14px 28px; text-align: center;">
            <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 Unnati Society · IIIT Bhagalpur</p>
          </div>
        </div>
      `,
    });
    this.logger.log(`Admin reply sent to ${params.to}`);
  }

  async sendTeamLeadApplicationNotification(data: {
    name: string;
    email: string;
    phone: string;
  }) {
    try {
      const defaultAdminEmail = await this.settingsService.getSetting(
        'ADMIN_EMAIL',
        process.env.ADMIN_EMAIL || 'admin@unnatisociety.org',
      );

      const recipients = await this.prisma.notificationRecipient.findMany();
      const adminEmails =
        recipients.length > 0
          ? recipients.map((r) => r.email)
          : [defaultAdminEmail];

      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting(
        'SMTP_USER',
        process.env.SMTP_USER || '',
      );

      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
        to: adminEmails,
        subject: `New Team Lead Application: ${data.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #0F172A; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Team Lead Application</h2>
            <p>A new user has applied to become a Team Lead. Please review their application in the Admin Dashboard.</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Status:</strong> Pending Approval</p>
          </div>
        `,
      });
      this.logger.log(
        `Team Lead application notification sent to ${adminEmails.join(', ')}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send Team Lead application notification: ${error.message}`,
      );
    }
  }
}

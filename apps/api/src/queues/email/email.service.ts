import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SystemSettingsService } from '../../modules/system-settings/system-settings.service';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private async pushToQueue(mailOptions: any) {
    const smtpUser = await this.settingsService.getSetting(
      'SMTP_USER',
      process.env.SMTP_USER || '',
    );
    if (!mailOptions.from) {
      mailOptions.from = `"Unnati Society" <${smtpUser}>`;
    }
    await this.emailQueue.add('send-email', mailOptions);
  }

  constructor(
    private readonly prisma: PrismaService,
    private readonly settingsService: SystemSettingsService,
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  async sendContactAutoReply(name: string, email: string) {
    try {
      await this.pushToQueue({
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

      // Fetch dynamic admin recipients for Contact form
      const recipients = await this.prisma.notificationRecipient.findMany({
        where: { status: 'Active', categories: { has: 'Contact' } },
      });
      const adminEmails =
        recipients.length > 0
          ? recipients.map((r) => r.email)
          : [defaultAdminEmail];

      await this.pushToQueue({
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
    await this.pushToQueue({
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

      const recipients = await this.prisma.notificationRecipient.findMany({
        where: { status: 'Active', categories: { has: 'Volunteer Form' } },
      });
      const adminEmails =
        recipients.length > 0
          ? recipients.map((r) => r.email)
          : [defaultAdminEmail];

      await this.pushToQueue({
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

  // Called for volunteer status update (name is misleading but kept for compatibility)
  async sendVolunteerStatusUpdateEmail(data: {
    name: string;
    email: string;
    status: string;
  }) {
    try {
      await this.pushToQueue({
        to: data.email,
        subject: `Your Volunteer Application — Status Update`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #2563EB;">Hello ${data.name}!</h2>
            <p>Your volunteer application status has been updated to: <strong>${data.status}</strong>.</p>
            <p>Thank you for your interest in Unnati Society.</p>
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(`Volunteer status update email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send volunteer status update email to ${data.email}: ${error.message}`,
      );
    }
  }

  // Confirmation email sent to the school coordinator when they submit a campus visit request
  async sendCampusVisitReceivedEmail(data: {
    coordinatorName: string;
    email: string;
    institutionName: string;
  }) {
    try {
      await this.pushToQueue({
        to: data.email,
        subject: 'Campus Visit Request Received',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #2563EB;">Thank you for your request, ${data.coordinatorName}!</h2>
            <p>We have successfully received your campus visit request for <strong>${data.institutionName}</strong>.</p>
            <p>Our team will review your request and contact you shortly to confirm the details and dates.</p>
            <p>Thank you for your interest in Unnati Society.</p>
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(`Campus visit received email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send campus visit received email to ${data.email}: ${error.message}`,
      );
    }
  }

  // Status update email for campus visit requests
  async sendCampusVisitStatusUpdateEmail(data: {
    coordinatorName: string;
    email: string;
    institutionName: string;
    status: string;
  }) {
    try {
      await this.pushToQueue({
        to: data.email,
        subject: `Campus Visit Request — Status Update`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #2563EB;">Hello ${data.coordinatorName}!</h2>
            <p>Your campus visit request for <strong>${data.institutionName}</strong> has been updated to: <strong>${data.status}</strong>.</p>
            <p>Thank you for your interest in Unnati Society.</p>
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(`Campus visit status update email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send campus visit status update email to ${data.email}: ${error.message}`,
      );
    }
  }

  // Confirmation email sent to a school when they submit a school invite
  async sendSchoolInviteReceivedEmail(data: {
    coordinatorName: string;
    email: string;
    institutionName: string;
  }) {
    try {
      await this.pushToQueue({
        to: data.email,
        subject: 'School Invitation Received',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #2563EB;">Thank you for your invitation, ${data.coordinatorName}!</h2>
            <p>We have successfully received the collaboration invitation for <strong>${data.institutionName}</strong>.</p>
            <p>Our team will review the details and contact you shortly to discuss how we can work together.</p>
            <p>Thank you for your interest in Unnati Society.</p>
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(`School invite received email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send school invite received email to ${data.email}: ${error.message}`,
      );
    }
  }

  // Status update email for school invites
  async sendSchoolInviteStatusUpdateEmail(data: {
    coordinatorName: string;
    email: string;
    institutionName: string;
    status: string;
  }) {
    try {
      await this.pushToQueue({
        to: data.email,
        subject: `School Invitation — Status Update`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #2563EB;">Hello ${data.coordinatorName}!</h2>
            <p>Your school invitation for <strong>${data.institutionName}</strong> has been updated to: <strong>${data.status}</strong>.</p>
            <p>Thank you for your interest in Unnati Society.</p>
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(
        `School invite status update email sent to ${data.email}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send school invite status update email to ${data.email}: ${error.message}`,
      );
    }
  }

  // Confirmation email sent to a partner when they submit a request
  async sendPartnerRequestReceivedEmail(data: {
    name: string;
    email: string;
    organization: string;
  }) {
    try {
      await this.pushToQueue({
        to: data.email,
        subject: 'Partnership Request Received',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #2563EB;">Thank you for your interest, ${data.name}!</h2>
            <p>We have successfully received your partnership request for <strong>${data.organization || 'your organization'}</strong>.</p>
            <p>Our team is reviewing the details you provided and will get back to you shortly to discuss how we can collaborate.</p>
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(`Partner request received email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send partner request received email to ${data.email}: ${error.message}`,
      );
    }
  }

  // Status update email for partner requests
  async sendPartnerStatusUpdateEmail(data: {
    name: string;
    email: string;
    organization: string;
    status: string;
  }) {
    try {
      await this.pushToQueue({
        to: data.email,
        subject: `Partnership Request — Status Update`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #2563EB;">Hello ${data.name}!</h2>
            <p>Your partnership request for <strong>${data.organization || 'your organization'}</strong> has been updated to: <strong>${data.status}</strong>.</p>
            <p>Our team will be in touch with you shortly.</p>
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(`Partner status update email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send partner status update email to ${data.email}: ${error.message}`,
      );
    }
  }

  // Generic admin notification for any form submission
  async sendAdminFormNotification(
    formTitle: string,
    category: string,
    formData: any,
  ) {
    try {
      const defaultAdminEmail = await this.settingsService.getSetting(
        'ADMIN_EMAIL',
        process.env.ADMIN_EMAIL || 'admin@unnatisociety.org',
      );

      const recipients = await this.prisma.notificationRecipient.findMany({
        where: { status: 'Active', categories: { has: category } },
      });
      const adminEmails =
        recipients.length > 0
          ? recipients.map((r) => r.email)
          : [defaultAdminEmail];

      const dataHtml = Object.entries(formData)
        .map(
          ([key, value]) => `<p><strong>${key}:</strong> ${String(value)}</p>`,
        )
        .join('');

      await this.pushToQueue({
        to: adminEmails,
        subject: `New ${formTitle} Submission`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #0F172A; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New ${formTitle} Submission</h2>
            ${dataHtml}
          </div>
        `,
      });
      this.logger.log(
        `Admin notification for ${formTitle} sent to ${adminEmails.join(', ')}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send ${formTitle} admin notification: ${error.message}`,
      );
    }
  }
}

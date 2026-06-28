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

  async sendVolunteerStatusUpdateEmail(data: {
    name: string;
    email: string;
    status: string;
  }) {
    try {
      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting(
        'SMTP_USER',
        process.env.SMTP_USER || '',
      );

      let subject = 'Update on your Volunteer Application';
      let messageContent = '';

      if (data.status === 'Approved') {
        subject = 'Congratulations! Your Volunteer Application is Approved';
        messageContent = `
          <h2 style="color: #2563EB;">Congratulations ${data.name}!</h2>
          <p>We are thrilled to inform you that your volunteer application for Unnati Society has been <strong>approved</strong>.</p>
          <p>It's wonderful to see your enthusiasm to contribute to our NGO. Our team will reach out to you shortly with the next steps regarding your onboarding and training.</p>
          <p>Welcome to the team!</p>
        `;
      } else if (data.status === 'Rejected') {
        subject = 'Update on your Volunteer Application';
        messageContent = `
          <h2 style="color: #475569;">Hello ${data.name},</h2>
          <p>Thank you for taking the time to apply to volunteer with Unnati Society.</p>
          <p>After careful consideration, we regret to inform you that we are unable to move forward with your application at this time.</p>
          <p>We deeply appreciate your interest in our cause and encourage you to apply again in the future.</p>
        `;
      } else if (data.status === 'Under Review') {
        subject = 'Update on your Volunteer Application';
        messageContent = `
          <h2 style="color: #475569;">Hello ${data.name},</h2>
          <p>Your volunteer application is currently <strong>Under Review</strong> by our team.</p>
          <p>We might reach out to you soon to schedule a brief interview or request some additional information.</p>
          <p>Thank you for your patience!</p>
        `;
      } else {
        subject = 'Update on your Volunteer Application';
        messageContent = `
          <h2 style="color: #475569;">Hello ${data.name},</h2>
          <p>The status of your volunteer application has been updated to: <strong>${data.status}</strong>.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
        `;
      }

      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
        to: data.email,
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            ${messageContent}
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
        `Failed to send volunteer status email to ${data.email}: ${error.message}`,
      );
    }
  }

  async sendCampusVisitReceivedEmail(data: {
    coordinatorName: string;
    email: string;
    institutionName: string;
  }) {
    try {
      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting('SMTP_USER', process.env.SMTP_USER || '');
      
      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
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
      this.logger.error(`Failed to send campus visit received email to ${data.email}: ${error.message}`);
    }
  }

  async sendCampusVisitStatusUpdateEmail(data: {
    coordinatorName: string;
    email: string;
    institutionName: string;
    status: string;
  }) {
    try {
      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting('SMTP_USER', process.env.SMTP_USER || '');
      
      let subject = 'Update on your Campus Visit Request';
      let messageContent = '';

      if (data.status === 'ACCEPTED') {
        subject = 'Campus Visit Request Approved!';
        messageContent = `
          <h2 style="color: #16A34A;">Great news, ${data.coordinatorName}!</h2>
          <p>Your campus visit request for <strong>${data.institutionName}</strong> has been <strong>approved</strong> by the Unnati Society.</p>
          <p>We are excited to host your students and teachers. Our team will reach out with a detailed schedule shortly.</p>
        `;
      } else if (data.status === 'REJECTED') {
        messageContent = `
          <h2 style="color: #475569;">Hello ${data.coordinatorName},</h2>
          <p>Thank you for submitting a campus visit request for <strong>${data.institutionName}</strong>.</p>
          <p>Unfortunately, we are unable to accommodate your visit request at this time.</p>
          <p>We appreciate your interest and hope to collaborate with you in the future.</p>
        `;
      } else {
        messageContent = `
          <h2 style="color: #475569;">Hello ${data.coordinatorName},</h2>
          <p>The status of your campus visit request for <strong>${data.institutionName}</strong> is now: <strong>${data.status}</strong>.</p>
        `;
      }

      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
        to: data.email,
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            ${messageContent}
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(`Campus visit status email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(`Failed to send campus visit status email to ${data.email}: ${error.message}`);
    }
  }

  async sendSchoolInviteReceivedEmail(data: {
    coordinatorName: string;
    email: string;
    institutionName: string;
  }) {
    try {
      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting('SMTP_USER', process.env.SMTP_USER || '');
      
      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
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
      this.logger.error(`Failed to send school invite received email to ${data.email}: ${error.message}`);
    }
  }

  async sendSchoolInviteStatusUpdateEmail(data: {
    coordinatorName: string;
    email: string;
    institutionName: string;
    status: string;
  }) {
    try {
      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting('SMTP_USER', process.env.SMTP_USER || '');
      
      let subject = 'Update on your School Invitation';
      let messageContent = '';

      if (data.status === 'ACCEPTED' || data.status === 'Approved') {
        subject = 'School Invitation Approved!';
        messageContent = `
          <h2 style="color: #16A34A;">Great news, ${data.coordinatorName}!</h2>
          <p>Your collaboration invitation for <strong>${data.institutionName}</strong> has been <strong>approved</strong> by the Unnati Society.</p>
          <p>We are excited to work together. Our team will reach out to you shortly to finalize the details.</p>
        `;
      } else if (data.status === 'REJECTED' || data.status === 'Rejected') {
        messageContent = `
          <h2 style="color: #475569;">Hello ${data.coordinatorName},</h2>
          <p>Thank you for submitting an invitation for <strong>${data.institutionName}</strong>.</p>
          <p>Unfortunately, we are unable to accept your invitation at this time.</p>
          <p>We appreciate your interest and hope to collaborate with you in the future.</p>
        `;
      } else if (data.status === 'INFO_REQUESTED' || data.status === 'Need More Information') {
        messageContent = `
          <h2 style="color: #F59E0B;">Hello ${data.coordinatorName},</h2>
          <p>We have reviewed your invitation for <strong>${data.institutionName}</strong>, but we need some additional information to proceed.</p>
          <p>Our team will contact you shortly with specific questions, or you can reply directly to this email.</p>
        `;
      } else {
        messageContent = `
          <h2 style="color: #475569;">Hello ${data.coordinatorName},</h2>
          <p>The status of your invitation for <strong>${data.institutionName}</strong> is now: <strong>${data.status}</strong>.</p>
        `;
      }

      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
        to: data.email,
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            ${messageContent}
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(`School invite status email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(`Failed to send school invite status email to ${data.email}: ${error.message}`);
    }
  }

  async sendPartnerRequestReceivedEmail(data: {
    name: string;
    email: string;
    organization: string;
  }) {
    try {
      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting('SMTP_USER', process.env.SMTP_USER || '');
      
      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
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
      this.logger.error(`Failed to send partner request received email to ${data.email}: ${error.message}`);
    }
  }

  async sendPartnerStatusUpdateEmail(data: {
    name: string;
    email: string;
    organization: string;
    status: string;
  }) {
    try {
      const transporter = await this.getTransporter();
      const smtpUser = await this.settingsService.getSetting('SMTP_USER', process.env.SMTP_USER || '');
      
      let subject = 'Update on your Partnership Request';
      let messageContent = '';

      if (data.status === 'ACCEPTED' || data.status === 'Approved') {
        subject = 'Partnership Request Approved!';
        messageContent = `
          <h2 style="color: #16A34A;">Great news, ${data.name}!</h2>
          <p>Your partnership request for <strong>${data.organization || 'your organization'}</strong> has been <strong>approved</strong> by the Unnati Society.</p>
          <p>We are excited to work together. Our team will reach out to you shortly to finalize the details and next steps.</p>
        `;
      } else if (data.status === 'REJECTED' || data.status === 'Rejected') {
        messageContent = `
          <h2 style="color: #475569;">Hello ${data.name},</h2>
          <p>Thank you for submitting a partnership request for <strong>${data.organization || 'your organization'}</strong>.</p>
          <p>Unfortunately, we are unable to accept your request at this time.</p>
          <p>We appreciate your interest and hope to collaborate with you in the future.</p>
        `;
      } else if (data.status === 'INFO_REQUESTED' || data.status === 'NEED_MORE_INFO' || data.status === 'Need More Info') {
        messageContent = `
          <h2 style="color: #F59E0B;">Hello ${data.name},</h2>
          <p>We have reviewed your partnership request for <strong>${data.organization || 'your organization'}</strong>, but we need some additional information to proceed.</p>
          <p>Our team will contact you shortly with specific questions, or you can reply directly to this email.</p>
        `;
      } else {
        messageContent = `
          <h2 style="color: #475569;">Hello ${data.name},</h2>
          <p>The status of your partnership request for <strong>${data.organization || 'your organization'}</strong> is now: <strong>${data.status}</strong>.</p>
        `;
      }

      await transporter.sendMail({
        from: `"Unnati Society" <${smtpUser}>`,
        to: data.email,
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            ${messageContent}
            <br/>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="color: #0F172A; font-weight: bold; margin: 5px 0 0;">The Unnati Society Team</p>
          </div>
        `,
      });
      this.logger.log(`Partner status email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(`Failed to send partner status email to ${data.email}: ${error.message}`);
    }
  }
}

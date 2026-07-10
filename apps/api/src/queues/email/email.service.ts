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
      const adminEmails = Array.from(
        new Set([defaultAdminEmail, ...recipients.map((r) => r.email)])
      );

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

  async sendEventNotification(email: string, event: any) {
    try {
      const eventDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
      const eventTime = new Date(event.date).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
      });
      await this.pushToQueue({
        to: email,
        subject: `Upcoming Event: ${event.title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="background-color: #2563EB; padding: 20px; text-align: center;">
              <h2 style="color: white; margin: 0;">Unnati Society</h2>
            </div>
            <div style="padding: 20px;">
              <h3>Upcoming Event Reminder</h3>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0;">${event.title}</h4>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${eventDate}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${eventTime}</p>
                <p style="margin: 5px 0;"><strong>Location:</strong> ${event.location || 'TBD'}</p>
              </div>
            </div>
          </div>
        `,
      });
      this.logger.log(`Event notification sent to ${email} for event ${event.id}`);
    } catch (error) {
      this.logger.error(`Failed to send event notification: ${error.message}`);
    }
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
      const adminEmails = Array.from(
        new Set([defaultAdminEmail, ...recipients.map((r) => r.email)])
      );

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

  // Status update email for team leads (when their application is approved or rejected)
  async sendTeamLeadStatusUpdateEmail(data: {
    name: string;
    email: string;
    status: string;
  }) {
    try {
      const isApproved = data.status.toLowerCase() === 'approved';
      const isRejected = data.status.toLowerCase() === 'rejected';
      const statusColor = isApproved ? '#16a34a' : isRejected ? '#dc2626' : '#2563EB';
      const statusBg = isApproved ? '#f0fdf4' : isRejected ? '#fef2f2' : '#eff6ff';
      const statusMsg = isApproved
        ? 'Congratulations! Your application to become a Team Lead has been approved. You can now log into your account using your credentials.'
        : isRejected
        ? 'Thank you for your interest. Unfortunately, we are unable to move forward with your Team Lead application at this time.'
        : `Your application status has been updated to <strong>${data.status}</strong>.`;

      await this.pushToQueue({
        to: data.email,
        subject: `Team Lead Application — ${data.status} | Unnati Society`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0B1F5E 0%, #2563EB 100%); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Unnati Society</h1>
              <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Transforming Lives Through Education</p>
            </div>
            <!-- Body -->
            <div style="padding: 36px 40px;">
              <h2 style="color: #0F172A; margin: 0 0 8px; font-size: 20px;">Hello, ${data.name}!</h2>
              <p style="color: #64748b; font-size: 14px; margin: 0 0 24px;">We have an update on your Team Lead application.</p>

              <!-- Status Badge -->
              <div style="background: ${statusBg}; border: 1px solid ${statusColor}33; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Application Status</p>
                <p style="margin: 0; color: ${statusColor}; font-size: 22px; font-weight: 700;">${data.status}</p>
              </div>

              <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">${statusMsg}</p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #64748b; font-size: 13px; margin: 0;">If you have any questions, feel free to reply to this email.</p>
              <p style="color: #64748b; font-size: 13px; margin: 8px 0 0;">Best regards,<br/><strong style="color: #0B1F5E;">The Unnati Society Team</strong></p>
            </div>
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 16px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 Unnati Society · IIIT Bhagalpur · <a href="https://unnatisociety.org" style="color: #2563EB; text-decoration: none;">unnatisociety.org</a></p>
            </div>
          </div>
        `,
      });
      this.logger.log(`Team Lead status update email sent to ${data.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send Team Lead status update email to ${data.email}: ${error.message}`,
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
      const isApproved = data.status.toLowerCase() === 'approved';
      const isRejected = data.status.toLowerCase() === 'rejected';
      const statusColor = isApproved ? '#16a34a' : isRejected ? '#dc2626' : '#2563EB';
      const statusBg = isApproved ? '#f0fdf4' : isRejected ? '#fef2f2' : '#eff6ff';
      const statusMsg = isApproved
        ? 'Congratulations! Your application has been approved. Our team will reach out to you shortly with next steps.'
        : isRejected
        ? 'Thank you for your interest. Unfortunately, we are unable to move forward with your application at this time. We encourage you to apply again in the future.'
        : `Your application status has been updated to <strong>${data.status}</strong>. We will be in touch soon.`;

      await this.pushToQueue({
        to: data.email,
        subject: `Your Volunteer Application — ${data.status} | Unnati Society`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0B1F5E 0%, #2563EB 100%); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Unnati Society</h1>
              <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Transforming Lives Through Education</p>
            </div>
            <!-- Body -->
            <div style="padding: 36px 40px;">
              <h2 style="color: #0F172A; margin: 0 0 8px; font-size: 20px;">Hello, ${data.name}!</h2>
              <p style="color: #64748b; font-size: 14px; margin: 0 0 24px;">We have an update on your volunteer application.</p>

              <!-- Status Badge -->
              <div style="background: ${statusBg}; border: 1px solid ${statusColor}33; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Application Status</p>
                <p style="margin: 0; color: ${statusColor}; font-size: 22px; font-weight: 700;">${data.status}</p>
              </div>

              <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">${statusMsg}</p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #64748b; font-size: 13px; margin: 0;">If you have any questions, feel free to reply to this email.</p>
              <p style="color: #64748b; font-size: 13px; margin: 8px 0 0;">Best regards,<br/><strong style="color: #0B1F5E;">The Unnati Society Team</strong></p>
            </div>
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 16px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 Unnati Society · IIIT Bhagalpur · <a href="https://unnatisociety.org" style="color: #2563EB; text-decoration: none;">unnatisociety.org</a></p>
            </div>
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

  // Confirmation email sent to the volunteer when they submit their application
  async sendVolunteerApplicationReceivedEmail(data: {
    name: string;
    email: string;
    program: string;
    role: string;
  }) {
    try {
      await this.pushToQueue({
        to: data.email,
        subject: `Application Received — Unnati Society Volunteer Programme`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0B1F5E 0%, #2563EB 100%); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Unnati Society</h1>
              <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Transforming Lives Through Education</p>
            </div>
            <!-- Body -->
            <div style="padding: 36px 40px;">
              <h2 style="color: #0F172A; margin: 0 0 8px; font-size: 20px;">Thank you, ${data.name}! 🎉</h2>
              <p style="color: #64748b; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
                We have successfully received your volunteer application and are thrilled by your interest in joining the Unnati Society family.
                Our support team will carefully review your application and get back to you soon.
              </p>

              <!-- Application Details Card -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px 24px; margin-bottom: 28px;">
                <p style="color: #0B1F5E; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 14px;">Application Summary</p>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #64748b; font-size: 13px; padding: 6px 0; width: 40%;">Programme</td>
                    <td style="color: #0F172A; font-size: 13px; font-weight: 600; padding: 6px 0;">${data.program}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-size: 13px; padding: 6px 0;">Role Applied For</td>
                    <td style="color: #0F172A; font-size: 13px; font-weight: 600; padding: 6px 0;">${data.role}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-size: 13px; padding: 6px 0;">Status</td>
                    <td style="color: #d97706; font-size: 13px; font-weight: 700; padding: 6px 0;">Under Review</td>
                  </tr>
                </table>
              </div>

              <!-- What's Next -->
              <p style="color: #0F172A; font-size: 14px; font-weight: 700; margin: 0 0 10px;">What happens next?</p>
              <ol style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0 0 28px; padding-left: 20px;">
                <li>Our team will review your application within <strong>3–5 business days</strong>.</li>
                <li>You will receive a status update email once a decision is made.</li>
                <li>If selected, we will reach out with onboarding details.</li>
              </ol>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #64748b; font-size: 13px; margin: 0;">
                Have questions? Reply to this email or contact us at <a href="mailto:volunteer@unnatisociety.org" style="color: #2563EB; text-decoration: none;">volunteer@unnatisociety.org</a>.
              </p>
              <p style="color: #64748b; font-size: 13px; margin: 12px 0 0;">
                Warm regards,<br/>
                <strong style="color: #0B1F5E; font-size: 14px;">The Unnati Society Team</strong>
              </p>
            </div>
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 16px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 Unnati Society · IIIT Bhagalpur · <a href="https://unnatisociety.org" style="color: #2563EB; text-decoration: none;">unnatisociety.org</a></p>
            </div>
          </div>
        `,
      });
      this.logger.log(`Volunteer application confirmation sent to ${data.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send volunteer application confirmation to ${data.email}: ${error.message}`,
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
      const isApproved = data.status.toLowerCase() === 'accepted' || data.status.toLowerCase() === 'approved';
      const isRejected = data.status.toLowerCase() === 'rejected';
      const statusColor = isApproved ? '#16a34a' : isRejected ? '#dc2626' : '#2563EB';
      const statusBg = isApproved ? '#f0fdf4' : isRejected ? '#fef2f2' : '#eff6ff';
      const statusMsg = isApproved
        ? 'Great news! Your campus visit request has been approved. Our team will reach out to you shortly to coordinate the visit details.'
        : isRejected
        ? 'Thank you for your interest. Unfortunately, we are unable to accommodate your campus visit request at this time.'
        : `Your campus visit request status has been updated to <strong>${data.status}</strong>.`;

      await this.pushToQueue({
        to: data.email,
        subject: `Campus Visit Request — ${data.status} | Unnati Society`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0B1F5E 0%, #2563EB 100%); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Unnati Society</h1>
              <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Transforming Lives Through Education</p>
            </div>
            <!-- Body -->
            <div style="padding: 36px 40px;">
              <h2 style="color: #0F172A; margin: 0 0 8px; font-size: 20px;">Hello, ${data.coordinatorName}!</h2>
              <p style="color: #64748b; font-size: 14px; margin: 0 0 24px;">We have an update on your campus visit request for <strong>${data.institutionName}</strong>.</p>

              <!-- Status Badge -->
              <div style="background: ${statusBg}; border: 1px solid ${statusColor}33; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Request Status</p>
                <p style="margin: 0; color: ${statusColor}; font-size: 22px; font-weight: 700;">${data.status}</p>
              </div>

              <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">${statusMsg}</p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #64748b; font-size: 13px; margin: 0;">If you have any questions, feel free to reply to this email.</p>
              <p style="color: #64748b; font-size: 13px; margin: 8px 0 0;">Best regards,<br/><strong style="color: #0B1F5E;">The Unnati Society Team</strong></p>
            </div>
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 16px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 Unnati Society · IIIT Bhagalpur · <a href="https://unnatisociety.org" style="color: #2563EB; text-decoration: none;">unnatisociety.org</a></p>
            </div>
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

  async sendSchoolInviteStatusUpdateEmail(data: {
    coordinatorName: string;
    email: string;
    institutionName: string;
    status: string;
  }) {
    try {
      const isApproved = data.status.toLowerCase() === 'accepted' || data.status.toLowerCase() === 'approved';
      const isRejected = data.status.toLowerCase() === 'rejected';
      const statusColor = isApproved ? '#16a34a' : isRejected ? '#dc2626' : '#2563EB';
      const statusBg = isApproved ? '#f0fdf4' : isRejected ? '#fef2f2' : '#eff6ff';
      const statusMsg = isApproved
        ? 'Great news! Your school invitation has been accepted. Our team will reach out to you shortly to coordinate the details.'
        : isRejected
        ? 'Thank you for your invitation. Unfortunately, we are unable to accept it at this time.'
        : `Your school invitation status has been updated to <strong>${data.status}</strong>.`;

      await this.pushToQueue({
        to: data.email,
        subject: `School Invitation — ${data.status} | Unnati Society`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0B1F5E 0%, #2563EB 100%); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Unnati Society</h1>
              <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Transforming Lives Through Education</p>
            </div>
            <!-- Body -->
            <div style="padding: 36px 40px;">
              <h2 style="color: #0F172A; margin: 0 0 8px; font-size: 20px;">Hello, ${data.coordinatorName}!</h2>
              <p style="color: #64748b; font-size: 14px; margin: 0 0 24px;">We have an update on your invitation for <strong>${data.institutionName}</strong>.</p>

              <!-- Status Badge -->
              <div style="background: ${statusBg}; border: 1px solid ${statusColor}33; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Invitation Status</p>
                <p style="margin: 0; color: ${statusColor}; font-size: 22px; font-weight: 700;">${data.status}</p>
              </div>

              <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">${statusMsg}</p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #64748b; font-size: 13px; margin: 0;">If you have any questions, feel free to reply to this email.</p>
              <p style="color: #64748b; font-size: 13px; margin: 8px 0 0;">Best regards,<br/><strong style="color: #0B1F5E;">The Unnati Society Team</strong></p>
            </div>
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 16px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 Unnati Society · IIIT Bhagalpur · <a href="https://unnatisociety.org" style="color: #2563EB; text-decoration: none;">unnatisociety.org</a></p>
            </div>
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
        subject: 'Partnership Request Received — Unnati Society',
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0B1F5E 0%, #2563EB 100%); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Unnati Society</h1>
              <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Transforming Lives Through Education</p>
            </div>
            <!-- Body -->
            <div style="padding: 36px 40px;">
              <h2 style="color: #0F172A; margin: 0 0 8px; font-size: 20px;">Thank you, ${data.name}! 🤝</h2>
              <p style="color: #64748b; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
                We have successfully received your partnership request for <strong>${data.organization || 'your organization'}</strong>.
                We appreciate your interest in collaborating with the Unnati Society. Our team is carefully reviewing the details you provided.
              </p>

              <!-- Application Details Card -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px 24px; margin-bottom: 28px;">
                <p style="color: #0B1F5E; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 14px;">Request Summary</p>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #64748b; font-size: 13px; padding: 6px 0; width: 40%;">Organization</td>
                    <td style="color: #0F172A; font-size: 13px; font-weight: 600; padding: 6px 0;">${data.organization || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-size: 13px; padding: 6px 0;">Status</td>
                    <td style="color: #d97706; font-size: 13px; font-weight: 700; padding: 6px 0;">Under Review</td>
                  </tr>
                </table>
              </div>

              <!-- What's Next -->
              <p style="color: #0F172A; font-size: 14px; font-weight: 700; margin: 0 0 10px;">What happens next?</p>
              <ol style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0 0 28px; padding-left: 20px;">
                <li>Our team will review your proposal within <strong>3–5 business days</strong>.</li>
                <li>You will receive a status update email once we complete our review.</li>
                <li>If there is a mutual fit, we will schedule a call to discuss the next steps.</li>
              </ol>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #64748b; font-size: 13px; margin: 0;">
                Have questions? Reply to this email or contact us directly.
              </p>
              <p style="color: #64748b; font-size: 13px; margin: 12px 0 0;">
                Warm regards,<br/>
                <strong style="color: #0B1F5E; font-size: 14px;">The Unnati Society Team</strong>
              </p>
            </div>
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 16px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 Unnati Society · IIIT Bhagalpur · <a href="https://unnatisociety.org" style="color: #2563EB; text-decoration: none;">unnatisociety.org</a></p>
            </div>
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
      const isApproved = data.status.toLowerCase() === 'accepted';
      const isRejected = data.status.toLowerCase() === 'rejected';
      const statusColor = isApproved ? '#16a34a' : isRejected ? '#dc2626' : '#2563EB';
      const statusBg = isApproved ? '#f0fdf4' : isRejected ? '#fef2f2' : '#eff6ff';
      const statusMsg = isApproved
        ? 'Great news! We are excited to move forward with your partnership request. Our team will reach out to you shortly to discuss the next steps.'
        : isRejected
        ? 'Thank you for your interest. Unfortunately, we are unable to pursue a partnership at this time. We wish you and your organization the best.'
        : `Your partnership request status has been updated to <strong>${data.status}</strong>. Our team will be in touch with you shortly.`;

      await this.pushToQueue({
        to: data.email,
        subject: `Partnership Request — ${data.status} | Unnati Society`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0B1F5E 0%, #2563EB 100%); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Unnati Society</h1>
              <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Transforming Lives Through Education</p>
            </div>
            <!-- Body -->
            <div style="padding: 36px 40px;">
              <h2 style="color: #0F172A; margin: 0 0 8px; font-size: 20px;">Hello, ${data.name}!</h2>
              <p style="color: #64748b; font-size: 14px; margin: 0 0 24px;">We have an update on your partnership request for <strong>${data.organization || 'your organization'}</strong>.</p>

              <!-- Status Badge -->
              <div style="background: ${statusBg}; border: 1px solid ${statusColor}33; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Request Status</p>
                <p style="margin: 0; color: ${statusColor}; font-size: 22px; font-weight: 700;">${data.status}</p>
              </div>

              <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">${statusMsg}</p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #64748b; font-size: 13px; margin: 0;">If you have any questions, feel free to reply to this email.</p>
              <p style="color: #64748b; font-size: 13px; margin: 8px 0 0;">Best regards,<br/><strong style="color: #0B1F5E;">The Unnati Society Team</strong></p>
            </div>
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 16px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 Unnati Society · IIIT Bhagalpur · <a href="https://unnatisociety.org" style="color: #2563EB; text-decoration: none;">unnatisociety.org</a></p>
            </div>
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
      const adminEmails = Array.from(
        new Set([defaultAdminEmail, ...recipients.map((r) => r.email)])
      );

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

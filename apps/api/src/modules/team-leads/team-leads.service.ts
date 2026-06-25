import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getAuth } from 'firebase-admin/auth';
import { EmailService } from '../../queues/email/email.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TeamLeadsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private notificationsService: NotificationsService,
  ) {}

  async findAll() {
    return this.prisma.teamLead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDashboardStats() {
    const total = await this.prisma.teamLead.count();
    const pending = await this.prisma.teamLead.count({
      where: { credStatus: 'Pending Approval' },
    });
    const inactive = await this.prisma.teamLead.count({
      where: { credStatus: 'Rejected' },
    });
    const active = total - pending - inactive;

    return { total, pending, active, inactive };
  }

  async getMsgAccessStats() {
    const all = await this.prisma.teamLead.findMany({
      select: { msgAccess: true },
    });

    const counts = {
      'Can View & Reply': 0,
      'Can View Only': 0,
      'No Access': 0,
      'Request Pending': 0,
    };

    all.forEach((lead) => {
      if (counts[lead.msgAccess] !== undefined) {
        counts[lead.msgAccess]++;
      }
    });

    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  }

  async create(data: {
    name: string;
    email: string;
    phone: string;
    position: string;
    msgAccess: string;
    password?: string;
  }) {
    // Check if email already exists
    const existing = await this.prisma.teamLead.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new ConflictException(
        'A Team Lead with this email already exists.',
      );
    }

    // Generate initials for avatar
    const initials = data.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    // Create Firebase User if password is provided
    if (data.password) {
      try {
        await getAuth().createUser({
          email: data.email,
          password: data.password,
          displayName: data.name,
        });
      } catch (err: any) {
        if (err.code === 'auth/email-already-exists') {
          // User already exists in Firebase, update their password
          try {
            const user = await getAuth().getUserByEmail(data.email);
            await getAuth().updateUser(user.uid, { password: data.password });
          } catch (updateErr) {
            console.error('Firebase Update User Error:', updateErr);
            throw new ConflictException(
              "Failed to update existing Firebase user's password.",
            );
          }
        } else {
          console.error('Firebase Create User Error:', err);
          throw new ConflictException('Failed to create Firebase user.');
        }
      }
    }

    try {
      const newLead = await this.prisma.teamLead.create({
        data: {
          ...data,
          avatar: initials,
          loginEmail: data.email,
          credStatus: 'Pending Approval',
          status: 'Junior Lead',
        },
      });

      await this.logActivity(
        'New Team Lead Added',
        newLead.name,
        `Added as ${data.position}`,
        'blue',
        'UserPlus',
      );

      return newLead;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'A Team Lead with this email already exists.',
        );
      }
      throw error;
    }
  }

  async apply(data: { name: string; email: string; phone: string }) {
    const existing = await this.prisma.teamLead.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new ConflictException(
        'A Team Lead with this email already exists.',
      );
    }

    const initials = data.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    try {
      const newLead = await this.prisma.teamLead.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          position: 'Pending Assignment',
          msgAccess: 'Request Pending',
          avatar: initials,
          loginEmail: data.email,
          credStatus: 'Pending Approval',
          status: 'Junior Lead',
        },
      });

      await this.logActivity(
        'New Application',
        newLead.name,
        `Applied to be a Team Lead`,
        'blue',
        'UserPlus',
      );

      // Fire and forget notifications
      this.emailService.sendTeamLeadApplicationNotification(data);
      this.notificationsService.createAdminNotification(
        'New Team Lead Application',
        `${data.name} has applied to become a Team Lead.`,
      );

      return newLead;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'A Team Lead with this email already exists.',
        );
      }
      throw error;
    }
  }

  async update(id: string, data: any) {
    const lead = await this.prisma.teamLead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Team Lead not found');

    const updated = await this.prisma.teamLead.update({
      where: { id },
      data,
    });

    // Logging based on what changed
    if (data.credStatus && data.credStatus !== lead.credStatus) {
      const isApproved = data.credStatus === 'Approved';
      await this.logActivity(
        isApproved
          ? 'Login Credentials Approved'
          : 'Login Credentials Rejected',
        lead.name,
        `Credentials were ${data.credStatus.toLowerCase()}`,
        isApproved ? 'green' : 'red',
        isApproved ? 'CheckCircle' : 'XCircle',
      );
    }

    if (data.status && data.status !== lead.status) {
      // Determine if promotion or demotion
      const ranks = ['Junior Lead', 'Team Lead', 'Sr. Team Lead'];
      const oldRank = ranks.indexOf(lead.status);
      const newRank = ranks.indexOf(data.status);
      const isPromo = newRank > oldRank;

      await this.logActivity(
        isPromo ? 'Position Promoted' : 'Position Demoted',
        lead.name,
        `${isPromo ? 'Promoted' : 'Demoted'} to ${data.status}`,
        isPromo ? 'purple' : 'orange',
        isPromo ? 'TrendingUp' : 'TrendingDown',
      );
    }

    if (data.msgAccess && data.msgAccess !== lead.msgAccess) {
      await this.logActivity(
        'Access Level Changed',
        lead.name,
        `Contact message access changed to: ${data.msgAccess}`,
        'blue',
        'Shield',
      );
    }

    return updated;
  }

  async generatePassword(id: string) {
    const lead = await this.prisma.teamLead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Team Lead not found');

    const newPassword = Math.random().toString(36).slice(-8);

    try {
      const firebaseUser = await getAuth().getUserByEmail(
        lead.loginEmail || lead.email,
      );
      await getAuth().updateUser(firebaseUser.uid, {
        password: newPassword,
      });

      await this.logActivity(
        'Credentials Generated',
        lead.name,
        'New password generated',
        'blue',
        'KeyRound',
      );
      return { success: true, password: newPassword };
    } catch (err: any) {
      console.error(err);

      // If user doesn't exist in Firebase yet, create them!
      if (err.code === 'auth/user-not-found') {
        try {
          await getAuth().createUser({
            email: lead.loginEmail || lead.email,
            password: newPassword,
            displayName: lead.name,
          });
          await this.logActivity(
            'Credentials Generated',
            lead.name,
            'New password generated (New User)',
            'blue',
            'KeyRound',
          );
          return { success: true, password: newPassword };
        } catch (createErr) {
          console.error(createErr);
          throw new ConflictException('Failed to create Firebase user.');
        }
      }

      throw new ConflictException('Failed to generate password in Firebase.');
    }
  }

  async remove(id: string) {
    const lead = await this.prisma.teamLead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Team Lead not found');

    // Attempt to delete from Firebase
    try {
      const firebaseUser = await getAuth().getUserByEmail(lead.email);
      if (firebaseUser) {
        await getAuth().deleteUser(firebaseUser.uid);
      }
    } catch (err: any) {
      // User might not exist in Firebase, ignore
      console.log('Firebase user not found or error deleting:', err.message);
    }

    await this.prisma.teamLead.delete({ where: { id } });
    await this.logActivity(
      'Team Lead Deleted',
      lead.name,
      'Removed from system',
      'red',
      'Trash2',
    );

    return { success: true };
  }

  // --- Activity Logs ---

  async logActivity(
    action: string,
    leadName: string,
    details: string,
    color: string,
    icon: string,
  ) {
    return this.prisma.activityLog.create({
      data: { action, leadName, details, color, icon },
    });
  }

  async getRecentActivity() {
    return this.prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
}

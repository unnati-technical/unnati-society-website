import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../queues/email/email.service';
import { NotificationsService } from '../notifications/notifications.service';
import { VolunteersRepository } from './repositories/volunteers.repository';
import { ApplyVolunteerDto } from './dto/apply-volunteer.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class VolunteersService {
  constructor(
    private prisma: PrismaService, // Kept for User/Role/Volunteer for now, ideally moved to their own repos later
    private emailService: EmailService,
    private notificationsService: NotificationsService,
    private volunteersRepository: VolunteersRepository,
  ) {}

  async findAll(query: PaginationDto) {
    const where: any = {};

    if (query.search) {
      where.OR = [
        {
          volunteer: {
            user: {
              firstName: { contains: query.search, mode: 'insensitive' },
            },
          },
        },
        {
          volunteer: {
            user: { lastName: { contains: query.search, mode: 'insensitive' } },
          },
        },
        {
          volunteer: {
            user: { email: { contains: query.search, mode: 'insensitive' } },
          },
        },
      ];
    }

    const paginated = await this.volunteersRepository.paginate(query, {
      where,
      include: {
        volunteer: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Transform to match the frontend Volunteer interface
    paginated.data = paginated.data.map((app: any) => ({
      id: app.id,
      volunteerId: `VOL-${app.createdAt.getFullYear()}-${app.id.substring(0, 4).toUpperCase()}`,
      name: `${app.volunteer.user.firstName} ${app.volunteer.user.lastName}`,
      email: app.volunteer.user.email,
      phone: app.phone,
      program: app.program,
      role: app.roleAppliedFor,
      status:
        app.status === 'UNDER_REVIEW'
          ? 'Under Review'
          : app.status.charAt(0).toUpperCase() +
            app.status.slice(1).toLowerCase(),
      appliedDate: app.createdAt.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(app.volunteer.user.firstName + ' ' + app.volunteer.user.lastName)}`,
      dob: app.dob,
      gender: app.gender,
      education: app.education,
      college: app.college,
      currentYear: app.currentYear,
      availability: app.availability,
      preferredMode: app.preferredMode,
      preferredLocation: app.preferredLocation,
      address: app.address,
      whyVolunteer: app.whyVolunteer,
      skills: app.skills || [],
      interests: app.interests || [],
      linkedinUrl: app.linkedinUrl,
      portfolioUrl: app.portfolioUrl,
      resumeUrl: app.resumeUrl,
      howDidYouHear: app.howDidYouHear,
      department: app.department,
      hoursPerWeek: app.hoursPerWeek,
      hasNgoExperience: app.hasNgoExperience,
      ngoName: app.ngoName,
      experienceDesc: app.experienceDesc,
      emergencyName: app.emergencyName,
      emergencyPhone: app.emergencyPhone,
      careerGoals: app.careerGoals,
      startDate: app.startDate,
    })) as any;

    return paginated;
  }

  async findOne(id: string) {
    const app = await this.volunteersRepository.findUnique({
      where: { id },
      include: {
        volunteer: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!app) {
      throw new NotFoundException('Volunteer application not found');
    }

    return app;
  }

  async apply(createDto: ApplyVolunteerDto) {
    const {
      email,
      fullName,
      phone,
      gender,
      age,
      city,
      college,
      currentYear,
      department,
      linkedin,
      portfolio,
      resume,
      interests,
      availability,
      mode,
      hoursPerWeek,
      whyJoin,
      skills,
      ngoName,
      hasNgoExperience,
      experienceDesc,
      emergencyName,
      emergencyPhone,
      careerGoals,
      startDate,
      hearAboutUs,
    } = createDto;

    const names = (fullName || '').trim().split(' ');
    const firstName = names[0] || 'Unknown';
    const lastName = names.slice(1).join(' ') || '';

    // 1. Get or create Role
    let userRole = await this.prisma.role.findUnique({
      where: { name: 'USER' },
    });
    if (!userRole) {
      userRole = await this.prisma.role.create({
        data: { name: 'USER', permissions: [] },
      });
    }

    // 2. Get or create User
    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      const tempPassword = await bcrypt.hash(
        Math.random().toString(36).slice(-10),
        10,
      );
      user = await this.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: tempPassword,
          roleId: userRole.id,
        },
      });
    }

    // 3. Get or create Volunteer profile
    let volunteer = await this.prisma.volunteer.findUnique({
      where: { userId: user.id },
    });
    if (!volunteer) {
      volunteer = await this.prisma.volunteer.create({
        data: {
          userId: user.id,
          skills: interests || [],
        },
      });
    }

    // 4. Create Volunteer Application
    const application = await this.volunteersRepository.create({
      data: {
        volunteerId: volunteer.id,
        status: 'PENDING',
        program: interests && interests.length > 0 ? interests[0] : 'General',
        roleAppliedFor: mode || 'Volunteer',
        phone: phone || '',
        dob: age ? (new Date().getFullYear() - parseInt(age)).toString() : '',
        gender: gender || '',
        college: college || '',
        currentYear: currentYear || '',
        availability: availability || '',
        preferredMode: mode || 'Online',
        preferredLocation: city || '',
        address: city || '',
        whyVolunteer: whyJoin || '',
        linkedinUrl: linkedin || null,
        portfolioUrl: portfolio || null,
        resumeUrl: resume || null,
        howDidYouHear: hearAboutUs || '',
        department: department || '',
        hoursPerWeek: hoursPerWeek || '',
        hasNgoExperience: hasNgoExperience || 'no',
        ngoName: ngoName || '',
        experienceDesc: experienceDesc || '',
        emergencyName: emergencyName || '',
        emergencyPhone: emergencyPhone || '',
        careerGoals: careerGoals || '',
        startDate: startDate || '',
        interests: interests || [],
        skills: skills || [],
      },
    });

    // Create in-app notification for admins
    await this.notificationsService
      .createAdminNotification(
        'New Volunteer Application',
        `${firstName} ${lastName} has applied to volunteer for the ${application.program} program as a ${application.roleAppliedFor}.`,
      )
      .catch((err) =>
        console.error('Failed to create volunteer notification:', err),
      );

    // Send confirmation email to the applicant
    this.emailService
      .sendVolunteerApplicationReceivedEmail({
        name: `${firstName} ${lastName}`.trim(),
        email,
        program: application.program,
        role: application.roleAppliedFor,
      })
      .catch((err) =>
        console.error('Failed to send volunteer confirmation email:', err),
      );

    // Notify admins
    this.emailService.sendAdminFormNotification(
      'Volunteer Registration',
      'Volunteer Form',
      createDto,
    );

    return application;
  }

  async updateStatus(id: string, status: string) {
    // Map to DB enums/values if necessary
    const mappedStatus = status.toUpperCase().replace(' ', '_');

    const updated = await this.volunteersRepository.update({
      where: { id },
      data: { status: mappedStatus },
      include: {
        volunteer: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (updated?.volunteer?.user?.email) {
      // Run email sending in the background without blocking the request
      this.emailService
        .sendVolunteerStatusUpdateEmail({
          name: `${updated.volunteer.user.firstName} ${updated.volunteer.user.lastName}`.trim(),
          email: updated.volunteer.user.email,
          status: status, // Send the human-readable status, e.g. 'Approved'
        })
        .catch((err) =>
          console.error('Failed to trigger volunteer status email:', err),
        );
    }

    return updated;
  }

  async delete(id: string) {
    return this.volunteersRepository.delete({
      where: { id },
    });
  }

  async bulkDelete(ids: string[]) {
    return this.volunteersRepository.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}

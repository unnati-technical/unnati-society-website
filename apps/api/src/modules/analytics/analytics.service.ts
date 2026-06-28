import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getKpis() {
    // Basic counts
    const [studentsCount, volunteersCount, eventsCount, schoolsCount] =
      await Promise.all([
        this.prisma.student.count(),
        this.prisma.volunteer.count({ where: { status: 'ACTIVE' } }),
        this.prisma.event.count(),
        this.prisma.school.count(),
      ]);

    // Format matches the frontend kpiData array expectations
    return [
      {
        title: 'Total Beneficiaries',
        value: studentsCount.toLocaleString(),
        trend: '12.6%',
        trendUp: true,
      },
      {
        title: 'Active Volunteers',
        value: volunteersCount.toLocaleString(),
        trend: '18.4%',
        trendUp: true,
      },
      {
        title: 'Active Initiatives',
        value: eventsCount.toLocaleString(),
        trend: '9.7%',
        trendUp: true,
      },
      {
        title: 'Schools Connected',
        value: schoolsCount.toLocaleString(),
        trend: '4.2%',
        trendUp: true,
      },
    ];
  }

  async getPendingApprovals() {
    // Fetch pending volunteer applications
    const pendingVolunteers = await this.prisma.volunteerApplication.findMany({
      where: { status: 'PENDING' },
      include: {
        volunteer: {
          include: {
            user: true,
          },
        },
      },
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    // Fetch pending campus visit requests
    const pendingSchools = await this.prisma.campusVisitRequest.findMany({
      where: { status: 'PENDING' },
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    // We can merge them into a single list for the dashboard if needed,
    // or return as separate arrays.
    return {
      volunteers: pendingVolunteers,
      schools: pendingSchools,
    };
  }

  async getRecentActivities() {
    // Recent events
    const recentEvents = await this.prisma.event.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    // Recent outreach requests
    const recentOutreach = await this.prisma.outreachRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return {
      events: recentEvents,
      outreach: recentOutreach,
    };
  }
}

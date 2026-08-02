import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ToolResult } from './chat.types';

@Injectable()
export class ToolsService {
  private readonly logger = new Logger(ToolsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get upcoming events from the database.
   */
  async getUpcomingEvents(): Promise<ToolResult> {
    try {
      const events = await this.prisma.event.findMany({
        where: { date: { gte: new Date() } },
        orderBy: { date: 'asc' },
        take: 5,
      });

      if (events.length === 0) {
        return {
          toolName: 'getUpcomingEvents',
          data: [],
          formattedText:
            'There are no upcoming events scheduled at the moment. Check back soon!',
        };
      }

      const formatted = events
        .map(
          (e) =>
            `• **${e.title}** — ${new Date(e.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}${e.location ? ` at ${e.location}` : ''}`,
        )
        .join('\n');

      return {
        toolName: 'getUpcomingEvents',
        data: events,
        formattedText: `Here are the upcoming events:\n${formatted}`,
      };
    } catch (error) {
      this.logger.error(`getUpcomingEvents failed: ${error.message}`);
      return {
        toolName: 'getUpcomingEvents',
        data: null,
        formattedText:
          'I could not fetch event information right now. Please check the website for upcoming events.',
      };
    }
  }

  /**
   * Get count of active partner schools.
   */
  async getSchoolStats(): Promise<ToolResult> {
    try {
      const [total, active] = await Promise.all([
        this.prisma.school.count(),
        this.prisma.school.count({ where: { status: 'Active' } }),
      ]);

      return {
        toolName: 'getSchoolStats',
        data: { total, active },
        formattedText: `Unnati is currently partnered with **${active} active schools** (${total} total partnerships).`,
      };
    } catch (error) {
      this.logger.error(`getSchoolStats failed: ${error.message}`);
      return {
        toolName: 'getSchoolStats',
        data: null,
        formattedText: 'I could not fetch school statistics right now.',
      };
    }
  }

  /**
   * Get active volunteer count.
   */
  async getVolunteerStats(): Promise<ToolResult> {
    try {
      const count = await this.prisma.volunteer.count({
        where: { status: 'ACTIVE' },
      });

      return {
        toolName: 'getVolunteerStats',
        data: { count },
        formattedText: `Unnati currently has **${count} active volunteers** making a difference!`,
      };
    } catch (error) {
      this.logger.error(`getVolunteerStats failed: ${error.message}`);
      return {
        toolName: 'getVolunteerStats',
        data: null,
        formattedText: 'I could not fetch volunteer statistics right now.',
      };
    }
  }

  /**
   * Get past events for media/gallery context.
   */
  async getPastEvents(limit = 5): Promise<ToolResult> {
    try {
      const events = await this.prisma.event.findMany({
        where: { date: { lt: new Date() } },
        orderBy: { date: 'desc' },
        take: limit,
      });

      if (events.length === 0) {
        return {
          toolName: 'getPastEvents',
          data: [],
          formattedText: 'No past events found.',
        };
      }

      const formatted = events
        .map(
          (e) =>
            `• **${e.title}** — ${new Date(e.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}`,
        )
        .join('\n');

      return {
        toolName: 'getPastEvents',
        data: events,
        formattedText: `Recent past events:\n${formatted}`,
      };
    } catch (error) {
      this.logger.error(`getPastEvents failed: ${error.message}`);
      return {
        toolName: 'getPastEvents',
        data: null,
        formattedText: 'I could not fetch past event information right now.',
      };
    }
  }

  /**
   * List volunteer opportunities.
   */
  listOpportunities(): ToolResult {
    const opportunities = [
      {
        role: 'Teaching Volunteer',
        program: 'DigiXplore / Akshar',
        mode: 'Offline',
        commitment: '3-4 hrs/week',
      },
      {
        role: 'Mentorship Lead',
        program: 'Netritva',
        mode: 'Online/Offline',
        commitment: '2-3 hrs/week',
      },
      {
        role: 'Event Coordinator',
        program: 'All Programs',
        mode: 'Offline',
        commitment: 'Event-based',
      },
      {
        role: 'Content Creator',
        program: 'Social Media',
        mode: 'Online',
        commitment: '2 hrs/week',
      },
      {
        role: 'Technical Support',
        program: 'DigiXplore',
        mode: 'Offline',
        commitment: '2 hrs/week',
      },
    ];

    const formatted = opportunities
      .map(
        (o) => `• **${o.role}** (${o.program}) — ${o.mode}, ~${o.commitment}`,
      )
      .join('\n');

    return {
      toolName: 'listOpportunities',
      data: opportunities,
      formattedText: `Here are the current volunteer opportunities:\n${formatted}\n\nReady to apply? Visit our website or I can help you start the application!`,
    };
  }

  /**
   * Search for team members by name or role, or get the full roster.
   */
  async searchTeam(name?: string, role?: string): Promise<ToolResult> {
    try {
      const activeYear = await this.prisma.leadershipYear.findFirst({
        where: { isActive: true },
      });

      if (!activeYear) {
        return {
          toolName: 'searchTeam',
          data: null,
          formattedText: 'Team information is currently unavailable.',
        };
      }

      // Build where clause
      const whereClause: any = {
        section: { yearId: activeYear.id },
        isPublished: true,
      };

      if (name) {
        whereClause.fullName = { contains: name, mode: 'insensitive' };
      }
      if (role) {
        whereClause.designation = { contains: role, mode: 'insensitive' };
      }

      const members = await this.prisma.leadershipMember.findMany({
        where: whereClause,
        include: { section: true },
        orderBy: [
          { section: { displayOrder: 'asc' } },
          { displayOrder: 'asc' },
        ],
      });

      if (members.length === 0) {
        return {
          toolName: 'searchTeam',
          data: [],
          formattedText: `No team members found${name ? ` matching name "${name}"` : ''}${role ? ` and role "${role}"` : ''}.`,
        };
      }

      const formatted = members
        .map(
          (m) => `• **${m.fullName}** — ${m.designation} (${m.section.name})`,
        )
        .join('\n');

      return {
        toolName: 'searchTeam',
        data: members,
        formattedText: `Here is the team information (Year: ${activeYear.year}):\n${formatted}`,
      };
    } catch (error) {
      this.logger.error(`searchTeam failed: ${error.message}`);
      return {
        toolName: 'searchTeam',
        data: null,
        formattedText: 'I could not fetch team information right now.',
      };
    }
  }
}

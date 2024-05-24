import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { Prisma, UserActivity } from '@prisma/client';

@Injectable()
export class UserActivityService {
  constructor(private prisma: PrismaService) {}

  async logActivity(data: Prisma.UserActivityCreateInput): Promise<UserActivity> {
    return this.prisma.userActivity.create({
      data,
    });
  }

  async getLatestActivities(): Promise<UserActivity[]> {
    return this.prisma.userActivity.findMany({
      take: 100,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

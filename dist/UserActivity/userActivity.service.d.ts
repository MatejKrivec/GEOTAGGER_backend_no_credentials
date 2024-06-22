import { PrismaService } from '../PRISMA/prisma.service';
import { Prisma, UserActivity } from '@prisma/client';
export declare class UserActivityService {
    private prisma;
    constructor(prisma: PrismaService);
    logActivity(data: Prisma.UserActivityCreateInput): Promise<UserActivity>;
    getLatestActivities(): Promise<UserActivity[]>;
}

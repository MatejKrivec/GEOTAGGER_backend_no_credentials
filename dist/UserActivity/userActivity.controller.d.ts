import { UserActivityService } from './userActivity.service';
import { Prisma } from '@prisma/client';
export declare class UserActivityController {
    private readonly userActivityService;
    constructor(userActivityService: UserActivityService);
    logActivity(data: Prisma.UserActivityCreateInput): Promise<{
        id: number;
        userId: number;
        action: string;
        componentType: string;
        newValue: string;
        location: string;
        createdAt: Date;
    }>;
    getLatestActivities(): Promise<{
        id: number;
        userId: number;
        action: string;
        componentType: string;
        newValue: string;
        location: string;
        createdAt: Date;
    }[]>;
}

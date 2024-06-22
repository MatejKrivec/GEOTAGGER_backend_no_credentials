import { PrismaService } from 'src/PRISMA/prisma.service';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
}
export {};

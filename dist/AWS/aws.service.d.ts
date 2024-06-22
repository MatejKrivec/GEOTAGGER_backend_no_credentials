import { MulterFile } from 'multer';
import { PrismaService } from '../PRISMA/prisma.service';
export declare class AwsService {
    private readonly prisma;
    private readonly s3;
    constructor(prisma: PrismaService);
    uploadProfilePic(file: MulterFile, key: string): Promise<string>;
    deleteProfilePic(userId: string, keyy: string): Promise<void>;
    deleteLocationPic(locationID: string, keyy: string): Promise<void>;
}

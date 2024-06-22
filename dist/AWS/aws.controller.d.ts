import { AwsService } from './aws.service';
import { MulterFile } from 'multer';
export declare class AwsController {
    private readonly awsService;
    constructor(awsService: AwsService);
    uploadProfilePic(file: MulterFile, userId: string, key: string): Promise<{
        imageUrl: string;
    }>;
    uploadLocationPic(file: MulterFile, key: string): Promise<{
        imageUrl: string;
    }>;
    editLocationPic(file: MulterFile, locationID: string, key: string): Promise<{
        imageUrl: string;
    }>;
    remove(id: string, key: string): Promise<{
        message: string;
    }>;
}

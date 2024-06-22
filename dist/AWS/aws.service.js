"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const prisma_service_1 = require("../PRISMA/prisma.service");
let AwsService = class AwsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-north-1'
        });
    }
    async uploadProfilePic(file, key) {
        const uploadParams = {
            Bucket: 'geotagger',
            Key: `${key}${file.originalname}`,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype
        };
        const data = await this.s3.upload(uploadParams).promise();
        return data.Location;
    }
    async deleteProfilePic(userId, keyy) {
        try {
            const user = await this.prisma.uSER.findUnique({
                where: {
                    id: parseInt(userId),
                },
            });
            if (!user || !user.profilePic) {
                throw new Error('User or profile picture not found');
            }
            if (user.profilePic === 'https://geotagger.s3.eu-north-1.amazonaws.com/UserImages/default_user_pic.jpg') {
                console.log('Profile picture is the default user pic. Skipping deletion.');
                return;
            }
            const fileName = user.profilePic.split('/').pop();
            const key = `${keyy}${fileName}`;
            await this.s3.deleteObject({ Bucket: 'geotagger', Key: key }).promise();
        }
        catch (error) {
            console.error('Error deleting profile picture:', error);
            throw new Error('Error deleting profile picture');
        }
    }
    async deleteLocationPic(locationID, keyy) {
        try {
            const location = await this.prisma.location.findUnique({
                where: {
                    id: parseInt(locationID),
                },
            });
            if (!location || !location.photo) {
                throw new Error('User or location picture not found');
            }
            const fileName = location.photo.split('/').pop();
            const key = `${keyy}${fileName}`;
            await this.s3.deleteObject({ Bucket: 'geotagger', Key: key }).promise();
        }
        catch (error) {
            console.error('Error deleting location picture:', error);
            throw new Error('Error deleting location picture');
        }
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AwsService);
//# sourceMappingURL=aws.service.js.map
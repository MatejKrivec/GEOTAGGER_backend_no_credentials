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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const aws_service_1 = require("./aws.service");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../JWT/jwt-auth.guard");
let AwsController = class AwsController {
    constructor(awsService) {
        this.awsService = awsService;
    }
    async uploadProfilePic(file, userId, key) {
        try {
            if (!file) {
                throw new Error('No file uploaded');
            }
            const imageUrl = await this.awsService.uploadProfilePic(file, key);
            await this.awsService.deleteProfilePic(userId, key);
            return { imageUrl };
        }
        catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Error uploading image');
        }
    }
    async uploadLocationPic(file, key) {
        try {
            if (!file) {
                throw new Error('No file uploaded');
            }
            const imageUrl = await this.awsService.uploadProfilePic(file, key);
            return { imageUrl };
        }
        catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Error uploading image');
        }
    }
    async editLocationPic(file, locationID, key) {
        try {
            if (!file) {
                throw new Error('No file uploaded');
            }
            const imageUrl = await this.awsService.uploadProfilePic(file, key);
            await this.awsService.deleteLocationPic(locationID, key);
            return { imageUrl };
        }
        catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Error uploading image');
        }
    }
    async remove(id, key) {
        try {
            await this.awsService.deleteLocationPic(id, key);
            return { message: 'Location picture deleted successfully' };
        }
        catch (error) {
            console.error('Error deleting location picture:', error);
            throw new Error('Failed to delete location picture');
        }
    }
};
exports.AwsController = AwsController;
__decorate([
    (0, common_1.Post)('upload-profile-pic'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profilePic')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof multer_1.MulterFile !== "undefined" && multer_1.MulterFile) === "function" ? _a : Object, String, String]),
    __metadata("design:returntype", Promise)
], AwsController.prototype, "uploadProfilePic", null);
__decorate([
    (0, common_1.Post)('upload-location-pic'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('locationPic')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof multer_1.MulterFile !== "undefined" && multer_1.MulterFile) === "function" ? _b : Object, String]),
    __metadata("design:returntype", Promise)
], AwsController.prototype, "uploadLocationPic", null);
__decorate([
    (0, common_1.Post)('edit-location-pic'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('locationPic')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('locationID')),
    __param(2, (0, common_1.Body)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof multer_1.MulterFile !== "undefined" && multer_1.MulterFile) === "function" ? _c : Object, String, String]),
    __metadata("design:returntype", Promise)
], AwsController.prototype, "editLocationPic", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AwsController.prototype, "remove", null);
exports.AwsController = AwsController = __decorate([
    (0, swagger_1.ApiTags)('AWS'),
    (0, common_1.Controller)('aws'),
    __metadata("design:paramtypes", [aws_service_1.AwsService])
], AwsController);
//# sourceMappingURL=aws.controller.js.map
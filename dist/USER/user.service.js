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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../PRISMA/prisma.service");
const password_service_1 = require("./password.service");
let UserService = class UserService {
    constructor(prisma, passwordService) {
        this.prisma = prisma;
        this.passwordService = passwordService;
    }
    async getAllUsers() {
        return this.prisma.uSER.findMany();
    }
    async findOneByUsernameAndPassword(username, password) {
        const user = await this.prisma.uSER.findUnique({
            where: {
                username: username
            },
        });
        if (!user) {
            return null;
        }
        const isPasswordValid = await this.passwordService.comparePassword(password, user.password);
        if (isPasswordValid) {
            return user;
        }
        else {
            return null;
        }
    }
    async getUserById(id) {
        return this.prisma.uSER.findUnique({ where: { id } });
    }
    async validatePassword(id, currentPassword) {
        const user = await this.prisma.uSER.findUnique({ where: { id } });
        if (!user) {
            console.error('User not found');
            return false;
        }
        const isPasswordValid = await this.passwordService.comparePassword(currentPassword, user.password);
        return isPasswordValid;
    }
    async createUser(data) {
        const hashedPassword = await this.passwordService.hashPassword(data.password);
        return this.prisma.uSER.create({
            data: {
                ...data,
                password: hashedPassword,
                profilePic: "https://geotagger.s3.eu-north-1.amazonaws.com/UserImages/default_user_pic.jpg"
            }
        });
    }
    async posodobitevUser(params) {
        const { where, data } = params;
        return this.prisma.uSER.update({
            data,
            where,
        });
    }
    async updatePassword(id, newPassword) {
        const hashedPassword = await this.passwordService.hashPassword(newPassword);
        await this.prisma.uSER.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }
    async updateUserPoints(id, points) {
        const userId = parseInt(id);
        const user = await this.prisma.uSER.findUnique({
            where: {
                id: userId,
            },
        });
        if (user) {
            let calculatedPoints = user.points - points;
            if (calculatedPoints <= 0) {
                calculatedPoints = 0;
            }
            await this.prisma.uSER.update({
                where: { id: userId },
                data: { points: calculatedPoints },
            });
        }
        else {
            throw new Error('User not found');
        }
    }
    async uaddUserPoints(id, points) {
        const userId = parseInt(id);
        const user = await this.prisma.uSER.findUnique({
            where: {
                id: userId,
            },
        });
        await this.prisma.uSER.update({
            where: { id: userId },
            data: { points: user.points + points },
        });
    }
    async deleteUser(where) {
        return this.prisma.uSER.delete({
            where,
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        password_service_1.PasswordService])
], UserService);
//# sourceMappingURL=user.service.js.map
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
exports.PasswordResetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../PRISMA/prisma.service");
const uuid_1 = require("uuid");
let PasswordResetService = class PasswordResetService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async requestPasswordReset(email) {
        const user = await this.prisma.uSER.findUnique({ where: { email } });
        if (!user) {
            console.log("User not found");
            throw new common_1.NotFoundException('User not found');
        }
        const resetToken = (0, uuid_1.v4)();
        await this.prisma.passwordResetToken.create({
            data: {
                token: resetToken,
                expiryTime: new Date(Date.now() + 3600000),
                userId: user.id,
            },
        });
        return { resetToken, userId: user.id.toString() };
    }
    async validateToken(token) {
        const resetToken = await this.prisma.passwordResetToken.findFirst({ where: { token } });
        if (!resetToken) {
            throw new common_1.NotFoundException('Token not found');
        }
        if (resetToken.expiryTime < new Date()) {
            throw new Error('Token expired');
        }
        return { userId: resetToken.userId.toString() };
    }
    async create(createPasswordResetTokenDto) {
        const { userId } = createPasswordResetTokenDto;
        const expiryTime = new Date(Date.now() + 30 * 60 * 1000);
        const token = process.env.PASSWORD_RESET_TOKEN_SECRET_KEY;
        await this.prisma.passwordResetToken.create({
            data: {
                userId,
                token,
                expiryTime,
            },
        });
    }
};
exports.PasswordResetService = PasswordResetService;
exports.PasswordResetService = PasswordResetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PasswordResetService);
//# sourceMappingURL=pres.service.js.map
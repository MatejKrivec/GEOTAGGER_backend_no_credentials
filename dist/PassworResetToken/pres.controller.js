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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pres_service_1 = require("./pres.service");
const email_dto_1 = require("./email.dto");
const token_dto_1 = require("./token.dto");
const createToken_dto_1 = require("./createToken.dto");
const user_service_1 = require("../USER/user.service");
let PasswordResetController = class PasswordResetController {
    constructor(passwordResetService, userService) {
        this.passwordResetService = passwordResetService;
        this.userService = userService;
    }
    async requestPasswordReset(email) {
        return await this.passwordResetService.requestPasswordReset(email);
    }
    async validateToken(body) {
        const token = body.token;
        const newPassword = body.newPassword;
        const { userId } = await this.passwordResetService.validateToken(token);
        if (userId) {
            const id = parseInt(userId);
            await this.userService.updatePassword(id, newPassword);
        }
        return { userId };
    }
    async create(createPasswordResetTokenDto) {
        return this.passwordResetService.create(createPasswordResetTokenDto);
    }
};
exports.PasswordResetController = PasswordResetController;
__decorate([
    (0, common_1.Post)('/request'),
    (0, swagger_1.ApiBody)({ type: email_dto_1.EmailDto }),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.Post)('/validate-token'),
    (0, swagger_1.ApiBody)({ type: token_dto_1.TokenDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createToken_dto_1.CreatePasswordResetTokenDto]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "create", null);
exports.PasswordResetController = PasswordResetController = __decorate([
    (0, swagger_1.ApiTags)('ResetPassword'),
    (0, common_1.Controller)('ResetPassword'),
    __metadata("design:paramtypes", [pres_service_1.PasswordResetService,
        user_service_1.UserService])
], PasswordResetController);
//# sourceMappingURL=pres.controller.js.map
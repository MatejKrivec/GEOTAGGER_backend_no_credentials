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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("./user.dto");
const validatePassword_dto_1 = require("./validatePassword.dto");
const updateUser_dto_1 = require("./updateUser.dto");
const jwt_auth_guard_1 = require("../JWT/jwt-auth.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async login(username, password) {
        const user = await this.userService.findOneByUsernameAndPassword(username, password);
        return user;
    }
    async getUser(ID) {
        const id = parseInt(ID, 10);
        return this.userService.getUserById(id);
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async validatePassword(id, validatePasswordDto) {
        const userId = parseInt(id, 10);
        const currentPassword = validatePasswordDto.password;
        return this.userService.validatePassword(userId, currentPassword);
    }
    async createUser(userData) {
        return this.userService.createUser(userData);
    }
    async posodobitevUser(id, userData) {
        return this.userService.posodobitevUser({
            where: { id: Number(id) },
            data: userData,
        });
    }
    async updatePassword(id, validatePasswordDto) {
        const userId = parseInt(id, 10);
        const newPassword = validatePasswordDto.password;
        await this.userService.updatePassword(userId, newPassword);
    }
    updateUserPoints(id, data) {
        return this.userService.updateUserPoints(id, data.points);
    }
    addUserPoints(id, data) {
        return this.userService.uaddUserPoints(id, data.points);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('validatePassword/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, validatePassword_dto_1.ValidatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validatePassword", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The user has been successfully created.' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.CreateUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The user has been successfully updated.' }),
    (0, swagger_1.ApiBody)({ type: updateUser_dto_1.UpdateUserDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "posodobitevUser", null);
__decorate([
    (0, common_1.Patch)('updatePassword/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The password has been successfully updated.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, validatePassword_dto_1.ValidatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Patch)('updateUserPoints/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserPoints", null);
__decorate([
    (0, common_1.Patch)('addUserPoints/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUserPoints", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
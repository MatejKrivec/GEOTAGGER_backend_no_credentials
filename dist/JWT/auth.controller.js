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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./login.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        const { email, password } = req.body;
        const user = await this.authService.findOneByUsernameAndPassword(email, password);
        if (!user) {
            return { error: 'Invalid credentials' };
        }
        const token = await this.authService.generateToken({ sud: user.id, aud: user.username, role: user.role });
        return { token };
    }
    async protectedRoute(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Authorization header missing');
        }
        const [, token] = authHeader.split(' ');
        try {
            const decoded = this.authService.verifyToken(token);
            let role = 'Home';
            if (decoded.role === 'admin') {
                role = 'Admin';
            }
            return { route: role };
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
    async verifyToken(req) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decodedToken = this.authService.verifyToken(token);
            return { valid: true, decodedToken };
        }
        catch (error) {
            return { valid: false, error: error.message };
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('protected'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "protectedRoute", null);
__decorate([
    (0, common_1.Get)('verify-token'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('JWT'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
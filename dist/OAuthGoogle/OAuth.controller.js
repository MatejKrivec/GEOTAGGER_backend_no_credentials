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
exports.OAuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const OAuth_service_1 = require("./OAuth.service");
const swagger_1 = require("@nestjs/swagger");
let OAuthController = class OAuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleLogin() { }
    async googleLoginCallback(req, res) {
        const token = await this.authService.generateToken({ sud: req.user.id, aud: req.user.username, });
        res.redirect(`http://localhost:5173/Signin?token=${token}`);
    }
};
exports.OAuthController = OAuthController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "googleLoginCallback", null);
exports.OAuthController = OAuthController = __decorate([
    (0, swagger_1.ApiTags)('GoogleAuth'),
    (0, common_1.Controller)('Oauth'),
    __metadata("design:paramtypes", [OAuth_service_1.OAuthService])
], OAuthController);
//# sourceMappingURL=OAuth.controller.js.map
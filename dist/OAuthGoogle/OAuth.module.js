"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../PRISMA/prisma.service");
const OAuth_controller_1 = require("./OAuth.controller");
const google_strategy_1 = require("./google.strategy");
const jwt_1 = require("@nestjs/jwt");
const OAuth_service_1 = require("./OAuth.service");
let OAuthModule = class OAuthModule {
};
exports.OAuthModule = OAuthModule;
exports.OAuthModule = OAuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [OAuth_controller_1.OAuthController],
        providers: [jwt_1.JwtService, prisma_service_1.PrismaService, google_strategy_1.GoogleStrategy, OAuth_service_1.OAuthService,]
    })
], OAuthModule);
//# sourceMappingURL=OAuth.module.js.map
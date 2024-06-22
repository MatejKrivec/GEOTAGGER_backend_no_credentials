"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../PRISMA/prisma.service");
const userActivity_controller_1 = require("./userActivity.controller");
const userActivity_service_1 = require("./userActivity.service");
const jwt_1 = require("@nestjs/jwt");
let UserActivityModule = class UserActivityModule {
};
exports.UserActivityModule = UserActivityModule;
exports.UserActivityModule = UserActivityModule = __decorate([
    (0, common_1.Module)({
        controllers: [userActivity_controller_1.UserActivityController],
        providers: [jwt_1.JwtService, userActivity_service_1.UserActivityService, prisma_service_1.PrismaService],
    })
], UserActivityModule);
//# sourceMappingURL=userActivity.module.js.map
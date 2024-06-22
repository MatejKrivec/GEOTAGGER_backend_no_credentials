"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetTokenModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../PRISMA/prisma.service");
const pres_controller_1 = require("./pres.controller");
const pres_service_1 = require("./pres.service");
const user_service_1 = require("../USER/user.service");
const user_module_1 = require("../USER/user.module");
const password_service_1 = require("../USER/password.service");
let PasswordResetTokenModule = class PasswordResetTokenModule {
};
exports.PasswordResetTokenModule = PasswordResetTokenModule;
exports.PasswordResetTokenModule = PasswordResetTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule],
        controllers: [pres_controller_1.PasswordResetController],
        providers: [pres_service_1.PasswordResetService, prisma_service_1.PrismaService, user_service_1.UserService, password_service_1.PasswordService]
    })
], PasswordResetTokenModule);
//# sourceMappingURL=pres.module.js.map
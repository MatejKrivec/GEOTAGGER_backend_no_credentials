"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./USER/user.module");
const auth_module_1 = require("./JWT/auth.module");
const pres_module_1 = require("./PassworResetToken/pres.module");
const aws_module_1 = require("./AWS/aws.module");
const OAuth_module_1 = require("./OAuthGoogle/OAuth.module");
const location_module_1 = require("./LOCATION/location.module");
const guess_module_1 = require("./GUESS/guess.module");
const userActivity_module_1 = require("./UserActivity/userActivity.module");
const prisma_module_1 = require("./PRISMA/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            pres_module_1.PasswordResetTokenModule,
            aws_module_1.AwsModule,
            OAuth_module_1.OAuthModule,
            location_module_1.LocationModule,
            guess_module_1.GuessModule,
            userActivity_module_1.UserActivityModule,
            prisma_module_1.PrismaModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
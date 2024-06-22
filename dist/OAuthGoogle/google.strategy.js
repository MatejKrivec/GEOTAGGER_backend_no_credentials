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
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const prisma_service_1 = require("../PRISMA/prisma.service");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(prisma) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
            callbackURL: 'http://localhost:3000/Oauth/google/callback',
            scope: ['email', 'profile'],
        });
        this.prisma = prisma;
    }
    async validate(accessToken, refreshToken, profile) {
        const { displayName, emails, photos } = profile;
        const existingUser = await this.prisma.uSER.findUnique({
            where: {
                email: emails[0].value,
            },
        });
        if (existingUser) {
            return existingUser;
        }
        else {
            const newUser = await this.prisma.uSER.create({
                data: {
                    username: displayName,
                    email: emails[0].value,
                    password: null,
                    profilePic: "https://geotagger.s3.eu-north-1.amazonaws.com/UserImages/default_user_pic.jpg"
                },
            });
            return newUser;
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map
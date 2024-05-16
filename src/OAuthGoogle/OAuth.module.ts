import { Module } from "@nestjs/common";
import { PrismaService } from "src/PRISMA/prisma.service";
import { OAuthController } from "./OAuth.controller";
//import { AuthService } from "src/JWT/auth.service";
import { GoogleStrategy } from "./google.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { OAuthService } from "./OAuth.service";

@Module({

    controllers: [OAuthController],
    providers:[JwtService, PrismaService, GoogleStrategy, OAuthService, ]
})

export class OAuthModule{}
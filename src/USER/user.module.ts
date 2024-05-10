import { Module } from "@nestjs/common";
import { PrismaService } from "src/PRISMA/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Prisma } from "@prisma/client";
import { PasswordService } from "./password.service";

@Module({
    controllers: [UserController],
    providers: [PrismaService, UserService, PasswordService],
})
export class UserModule{}
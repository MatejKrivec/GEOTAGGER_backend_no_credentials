import { Module } from "@nestjs/common";
import { PrismaService } from "src/PRISMA/prisma.service";
import { PasswordResetController } from "./pres.controller";
import { PasswordResetService } from "./pres.service";


@Module({
    controllers: [PasswordResetController],
    providers:[PasswordResetService, PrismaService]
})

export class PasswordResetTokenModule{}
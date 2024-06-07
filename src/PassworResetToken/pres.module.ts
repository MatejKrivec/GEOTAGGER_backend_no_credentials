import { Module } from "@nestjs/common";
import { PrismaService } from "src/PRISMA/prisma.service";
import { PasswordResetController } from "./pres.controller";
import { PasswordResetService } from "./pres.service";
import { UserService } from "src/USER/user.service";
import { UserModule } from "src/USER/user.module";
import { PasswordService } from "src/USER/password.service";


@Module({
    imports: [UserModule],
    controllers: [PasswordResetController],
    providers:[PasswordResetService, PrismaService, UserService, PasswordService]
})

export class PasswordResetTokenModule{}
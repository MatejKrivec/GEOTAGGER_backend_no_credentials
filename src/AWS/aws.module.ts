import { Module } from "@nestjs/common";
import { PrismaService } from "src/PRISMA/prisma.service";
import { AwsService } from "./aws.service";
import { AwsController } from "./aws.controller";
import { JwtService } from "@nestjs/jwt";


@Module({
    controllers: [AwsController],
    providers:[JwtService, AwsService, PrismaService]
})

export class AwsModule{}
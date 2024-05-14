import { Module } from "@nestjs/common";
import { PrismaService } from "src/PRISMA/prisma.service";
import { AwsService } from "./aws.service";
import { AwsController } from "./aws.controller";


@Module({
    controllers: [AwsController],
    providers:[AwsService, PrismaService]
})

export class AwsModule{}
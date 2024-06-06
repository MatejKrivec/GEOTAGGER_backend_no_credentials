import { Module } from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { UserActivityController } from './userActivity.controller';
import { UserActivityService } from './userActivity.service';
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [UserActivityController],
  providers: [JwtService ,UserActivityService, PrismaService],
})
export class UserActivityModule {}

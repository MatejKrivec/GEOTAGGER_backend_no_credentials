import { Module } from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { UserActivityController } from './userActivity.controller';
import { UserActivityService } from './userActivity.service';

@Module({
  controllers: [UserActivityController],
  providers: [UserActivityService, PrismaService],
})
export class UserActivityModule {}

import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserActivityService } from './userActivity.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/JWT/jwt-auth.guard';

@ApiTags('User_Activity')
@Controller('user-activity')
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  async logActivity(@Body() data: Prisma.UserActivityCreateInput) {
    return this.userActivityService.logActivity(data);
  }

  @Get('latest')
  async getLatestActivities() {
    return this.userActivityService.getLatestActivities();
  }
  
}

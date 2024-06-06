import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [LocationController],
  providers: [JwtService, LocationService, PrismaService],
})
export class LocationModule {}

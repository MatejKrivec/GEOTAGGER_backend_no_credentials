import { Module } from '@nestjs/common';
import { GuessService } from './guess.service';
import { GuessController } from './guess.controller';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [GuessController],
  providers: [JwtService, GuessService, PrismaService],
})
export class GuessModule {}

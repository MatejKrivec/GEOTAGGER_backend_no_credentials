import { Module } from '@nestjs/common';
import { GuessService } from './guess.service';
import { GuessController } from './guess.controller';
import { PrismaService } from 'src/PRISMA/prisma.service';

@Module({
  controllers: [GuessController],
  providers: [GuessService, PrismaService],
})
export class GuessModule {}

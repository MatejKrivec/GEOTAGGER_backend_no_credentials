import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { Guess } from '@prisma/client';
import { CreateGuessDto } from './createGuess.dto';

@Injectable()
export class GuessService {
  constructor(private prisma: PrismaService) {}

  
  async create(data: CreateGuessDto): Promise<Guess> {
    return this.prisma.guess.create({ data });
  }

  async findAll(): Promise<Guess[]> {
    return this.prisma.guess.findMany();
  }

  async findByLocation(id: number): Promise<Guess[]> {
    return this.prisma.guess.findMany({ where: { LocationID: id } });
  }

  async findByUser(id: number): Promise<Guess[]> {
    return this.prisma.guess.findMany({ where: { UserID: id } });
  }

  async findOne(id: number): Promise<Guess> {
    return this.prisma.guess.findUnique({ where: { id } });
  }

  async update(id: number, data: { guessedLocation?: string; distance?: number }): Promise<Guess> {
    return this.prisma.guess.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Guess> {
    return this.prisma.guess.delete({ where: { id } });
  }

  async countGuesses(userId: number, locationId: number): Promise<number> {
    return this.prisma.guess.count({
      where: {
        UserID: userId,
        LocationID: locationId,
      },
    });
  }
}

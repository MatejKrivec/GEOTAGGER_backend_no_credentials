import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PRISMA/prisma.service';
import { Guess } from '@prisma/client';
import { DateTime } from 'aws-sdk/clients/devicefarm';

@Injectable()
export class GuessService {
  constructor(private prisma: PrismaService) {}

  async create(data: { UserID: number; LocationID: number; guessedLocation: string; distance: number; date: Date }): Promise<Guess> {
    return this.prisma.guess.create({ data });
  }

  async findAll(): Promise<Guess[]> {
    return this.prisma.guess.findMany();
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
}

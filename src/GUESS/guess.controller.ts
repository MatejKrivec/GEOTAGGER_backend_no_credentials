import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuessService } from './guess.service';
import { Guess } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Guess')
@Controller('guesses')
export class GuessController {
  constructor(private readonly guessService: GuessService) {}

  @Post()
  create(@Body() data: { UserID: number; LocationID: number; guessedLocation: string; distance: number; date: Date }): Promise<Guess> {
    return this.guessService.create(data);
  }

  @Get()
  findAll(): Promise<Guess[]> {
    return this.guessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Guess> {
    return this.guessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: { guessedLocation?: string; distance?: number }): Promise<Guess> {
    return this.guessService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Guess> {
    return this.guessService.remove(+id);
  }
}

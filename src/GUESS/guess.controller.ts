import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuessService } from './guess.service';
import { Guess } from '@prisma/client';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateGuessDto } from './createGuess.dto';

@ApiTags('Guess')
@Controller('guesses')
export class GuessController {
  constructor(private readonly guessService: GuessService) {}

  @Post()
  @ApiBody({type: CreateGuessDto })
  create(@Body() data: Guess): Promise<Guess> {
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

  @Get('user/:id')
  findByUser(@Param('id') id: string): Promise<Guess[]> {
    return this.guessService.findByUser(parseInt(id));
  }

  @Get('location/:id')
  findByLocation(@Param('id') id: string): Promise<Guess[]> {
    return this.guessService.findByLocation(parseInt(id));
  }

  @Get('count/:userId/:locationId')
  countGuesses(@Param('userId') userId: string, @Param('locationId') locationId: string): Promise<number> {
    return this.guessService.countGuesses(parseInt(userId), parseInt(locationId));
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

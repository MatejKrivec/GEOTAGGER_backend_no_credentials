import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GuessService } from './guess.service';
import { Guess } from '@prisma/client';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateGuessDto } from './createGuess.dto';
import { JwtAuthGuard } from 'src/JWT/jwt-auth.guard';

@ApiTags('Guess')
@Controller('guesses')
export class GuessController {
  constructor(private readonly guessService: GuessService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  @ApiBody({type: CreateGuessDto })
  create(@Body() data: CreateGuessDto): Promise<Guess> {
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
  @UseGuards(JwtAuthGuard) 
  findByUser(@Param('id') id: string): Promise<Guess[]> {
    return this.guessService.findByUser(parseInt(id));
  }

  @Get('location/:id')
  findByLocation(@Param('id') id: string): Promise<Guess[]> {
    return this.guessService.findByLocation(parseInt(id));
  }

  @Get('count/:userId/:locationId')
  @UseGuards(JwtAuthGuard) 
  countGuesses(@Param('userId') userId: string, @Param('locationId') locationId: string): Promise<number> {
    return this.guessService.countGuesses(parseInt(userId), parseInt(locationId));
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard) 
  update(@Param('id') id: string, @Body() data: { guessedLocation?: string; distance?: number }): Promise<Guess> {
    return this.guessService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  remove(@Param('id') id: string): Promise<Guess> {
    return this.guessService.remove(+id);
  }
}

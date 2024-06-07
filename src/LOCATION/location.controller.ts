import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '@prisma/client';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from './createLocation.dto';
import { JwtAuthGuard } from '../JWT/jwt-auth.guard';


@ApiTags('Locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  @ApiBody({ type: CreateLocationDto})
  async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) 
  findOne(@Param('id') id: string): Promise<Location> {
    return this.locationService.findOne(+id);
  }

  @Get('other/:id')
  @UseGuards(JwtAuthGuard) 
  findLocations(@Param('id') id: string): Promise<Location[]> {
    return this.locationService.findLocations(+id);
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard) 
  findUserLocations(@Param('id') id: string): Promise<Location[]> {
    return this.locationService.findUserLocations(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) 
  update(@Param('id') id: string, @Body() data: { name?: string; location?: string; photo?: string }): Promise<Location> {
    return this.locationService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  remove(@Param('id') id: string): Promise<Location> {
    return this.locationService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '@prisma/client';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from './createLocation.dto';


@ApiTags('Locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiBody({ type: CreateLocationDto})
  create(@Body() data: Location): Promise<Location> {
    return this.locationService.create(data);
  }

  @Get()
  findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Location> {
    return this.locationService.findOne(+id);
  }

  @Get('other/:id')
  findLocations(@Param('id') id: string): Promise<Location[]> {
    return this.locationService.findLocations(+id);
  }

  @Get('user/:id')
  findUserLocations(@Param('id') id: string): Promise<Location[]> {
    return this.locationService.findUserLocations(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: { name?: string; location?: string; photo?: string }): Promise<Location> {
    return this.locationService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Location> {
    return this.locationService.remove(+id);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { GeocodeService } from './geocode.service';

@Controller('geocode')
export class GeocodeController {
  constructor(private readonly geocodeService: GeocodeService) {}

  @Get('api-key')
  async geocode(@Query('address') address: string) {
    return this.geocodeService.geocode(address);
  }
}

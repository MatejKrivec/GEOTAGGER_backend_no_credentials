/*import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class GeocodeService {
  private readonly apiKey = process.env.GOOGLE_MAPS_API_KEY; 

  constructor(private httpService: HttpService) {}

  async geocode(address: string) {
    const response = await this.httpService.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address,
        key: this.apiKey,
      },
    }).toPromise();

    return response.data;
  }
}*/
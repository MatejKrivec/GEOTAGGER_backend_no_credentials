/*import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleMapsService extends Client {

  private readonly apiKey = process.env.GOOGLE_MAPS_API_KEY; 

  async getCoordinates(address: {
    street: string;
    number: string;
    city: string;
    state: string;
    postalCode: string;
  }): Promise<LatLngLiteral> {
    const googleRes = await this.geocode({
      params: {
        address: `${address.street}, ${address.number}, ${address.city}, ${address.state}, ${address.postalCode}`,
        key: this.apiKey,
      },
    });

    if (googleRes.data.status !== 'OK') {
      throw new Error('Failed to geocode address');
    }

    const { lng, lat } = googleRes.data.results[0].geometry.location;
    return { lng, lat };
  }
  geocode(arg0: { params: { address: string; key: string; }; }) {
    throw new Error('Method not implemented.');
  }
}
*/


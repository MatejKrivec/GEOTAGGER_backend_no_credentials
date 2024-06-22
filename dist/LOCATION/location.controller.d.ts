import { LocationService } from './location.service';
import { Location } from '@prisma/client';
import { CreateLocationDto } from './createLocation.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(createLocationDto: CreateLocationDto): Promise<Location>;
    findOne(id: string): Promise<Location>;
    findLocations(id: string): Promise<Location[]>;
    findUserLocations(id: string): Promise<Location[]>;
    update(id: string, data: {
        name?: string;
        location?: string;
        photo?: string;
    }): Promise<Location>;
    remove(id: string): Promise<Location>;
}

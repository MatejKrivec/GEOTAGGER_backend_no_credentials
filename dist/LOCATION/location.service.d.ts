import { PrismaService } from '../PRISMA/prisma.service';
import { Location } from "@prisma/client";
export declare class LocationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        userID: number;
        name: string;
        location: string;
        photo: string;
        date: Date;
    }): Promise<Location>;
    findAll(): Promise<Location[]>;
    findOne(id: number): Promise<Location>;
    findUserLocations(id: number): Promise<Location[]>;
    findLocations(id: number): Promise<Location[]>;
    update(id: number, data: {
        name?: string;
        location?: string;
        photo?: string;
    }): Promise<Location>;
    remove(id: number): Promise<Location>;
}

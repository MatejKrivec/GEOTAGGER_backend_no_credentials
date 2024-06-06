import { Injectable } from '@nestjs/common';
//import { PrismaService } from 'src/PRISMA/prisma.service';
import { PrismaService } from '../PRISMA/prisma.service';

import { Prisma, Location } from "@prisma/client";
import { DateTime } from 'aws-sdk/clients/devicefarm';


@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async create(data: { userID: number; name: string; location: string; photo: string; date: Date }): Promise<Location> {
    return this.prisma.location.create({ data });
  }

  async findAll(): Promise<Location[]> {
    return this.prisma.location.findMany();
  }

  async findOne(id: number): Promise<Location> {
    return this.prisma.location.findUnique({ where: { id } });
  }

  async findUserLocations(id: number): Promise<Location[]> {
    return this.prisma.location.findMany({ where: { userID: id } });
  }

  async findLocations(id: number): Promise<Location[]> {
    return this.prisma.location.findMany({ where: { userID: { not: id } } });
  }

  async update(id: number, data: { name?: string; location?: string; photo?: string }): Promise<Location> {
    return this.prisma.location.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Location> {
    return this.prisma.location.delete({ where: { id } });
  }
}

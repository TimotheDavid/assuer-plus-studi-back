import { Injectable } from '@nestjs/common';
import { CreateAccidentDto } from './dto/create-accident.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDriverInfosDto } from './dto/update-driver-infos.dto';
import { UpdateLocationsInfosDto } from './dto/update-locations-infos.dto';
import { UpdateDescriptionInfosDto } from './dto/update-description-infos.dto';

@Injectable()
export class AccidentsService {
  constructor(private readonly prisma: PrismaService) {}

  get(accidentId: string) {
    return this.prisma.accident.findFirst({
      where: {
        id: accidentId,
      },
      select: {
        first_name: true,
        name: true,
      },
    });
  }

  async updateWithLocation(location: UpdateLocationsInfosDto) {
    await this.prisma.accident.update({
      where: {
        id: location.accidentId,
      },
      data: {
        latitude: location.location.lat.toString(),
        longitude: location.location.lng.toString(),
      },
    });
  }

  async updateWithDescription(description: UpdateDescriptionInfosDto) {
    await this.prisma.accident.update({
      where: {
        id: description.accidentId,
      },
      data: {
        description: description.description,
        date: description.date.toString(),
      },
    });
  }

  async updateWithDriver(driver: UpdateDriverInfosDto) {
    await this.prisma.accident.update({
      where: {
        id: driver.accidentId,
      },
      data: {
        first_name: driver.firstname,
        name: driver.name,
        email: driver.email,
        driver_permit_date: driver.driver_permit_date.toString(),
        driver_permit_number: driver.driver_permit_number.toString(),
        driver_permit_place: driver.driver_permit_place.toString(),
      },
    });
  }

  async create(accidents: CreateAccidentDto) {
    return this.prisma.accident.create({
      select: {
        id: true,
      },
      data: {
        user: {
          connect: {
            id: accidents.userId,
          },
        },
      },
    });
  }
}

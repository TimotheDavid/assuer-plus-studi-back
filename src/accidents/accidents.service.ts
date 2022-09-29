import { Injectable } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateAccidentDto } from './dto/create-accident.dto';
import { PrismaService } from '../prisma/prisma.service';

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
  async create(accidents: CreateAccidentDto) {
    await this.prisma.accident.create({
      data: {
        email: accidents.email,
        date: accidents.date,
        description: accidents.description,
        driver_permit_date: accidents.driver_permit_date,
        driver_permit_number: accidents.driver_permit_number,
        driver_permit_place: accidents.driver_permit_place,
        latitude: accidents.latitude,
        longitude: accidents.longitude,
        first_name: accidents.firstname,
        name: accidents.name,
        user: {
          connect: {
            id: accidents.userId,
          },
        },
      },
    });
  }
}

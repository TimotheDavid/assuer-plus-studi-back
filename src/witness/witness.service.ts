import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWitnessDto } from './dto/create-witness.dto';

@Injectable()
export class WitnessService {
  constructor(private readonly prisma: PrismaService) {}

  getWitness(id: string) {
    return this.prisma.witness.findMany({
      where: {
        accidentId: id,
      },
      select: {
        name: true,
        firstname: true,
      },
    });
  }

  async create(witness: CreateWitnessDto) {
    await this.prisma.witness.create({
      data: {
        email: witness.email,
        address: witness.address,
        city: witness.city,
        postal_code: witness.postal_code.toString(),
        name: witness.name,
        firstname: witness.firstname,
        accident: {
          connect: {
            id: witness.accidentId,
          },
        },
      },
    });
  }
}

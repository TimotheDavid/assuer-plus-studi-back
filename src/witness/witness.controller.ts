import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { WitnessService } from './witness.service';
import { PrismaService } from '../prisma/prisma.service';
import {CreateAccidentDto} from "../accidents/dto/create-accident.dto";
import {CreateWitnessDto} from "./dto/create-witness.dto";

@Controller('witness')
export class WitnessController {
  constructor(private readonly witnessService: WitnessService) {}

  @Get('/:id')
  public getWitness(@Param('id') id: string) {
    return this.witnessService.getWitness(id);
  }

  @Post()
  public create(@Body() witness: CreateWitnessDto) {
    this.witnessService.create(witness);
  }
}

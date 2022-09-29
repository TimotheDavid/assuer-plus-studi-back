import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccidentsService } from './accidents.service';
import { CreateAccidentDto } from './dto/create-accident.dto';

@Controller('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Post()
  create(@Body() accidents: CreateAccidentDto) {
    this.accidentsService.create(accidents);
  }

  @Get('/:id')
  get(@Param('id') accidentId: string) {
    return this.accidentsService.get(accidentId);
  }
}

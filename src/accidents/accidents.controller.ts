import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AccidentsService } from './accidents.service';
import { CreateAccidentDto } from './dto/create-accident.dto';
import { UpdateDescriptionInfosDto } from './dto/update-description-infos.dto';
import { UpdateDriverInfosDto } from './dto/update-driver-infos.dto';
import { UpdateLocationsInfosDto } from './dto/update-locations-infos.dto';

@Controller('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Post()
  create(@Body() accidents: CreateAccidentDto) {
    return this.accidentsService.create(accidents);
  }

  @Get('/:id')
  get(@Param('id') accidentId: string) {
    return this.accidentsService.get(accidentId);
  }

  @Put('/description')
  async putDescription(@Body() description: UpdateDescriptionInfosDto) {
    await this.accidentsService.updateWithDescription(description);
  }

  @Put('/driver')
  async putDriver(@Body() driver: UpdateDriverInfosDto) {
    await this.accidentsService.updateWithDriver(driver);
  }

  @Put('/location')
  async putLocation(@Body() location: UpdateLocationsInfosDto) {
    await this.accidentsService.updateWithLocation(location);
  }
}

import { Module } from '@nestjs/common';
import { AccidentsService } from './accidents.service';
import { AccidentsController } from './accidents.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AccidentsController],
  providers: [AccidentsService, PrismaService],
  imports: [PrismaModule],
})
export class AccidentsModule {}

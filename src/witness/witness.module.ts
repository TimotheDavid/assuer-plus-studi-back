import { Module } from '@nestjs/common';
import { WitnessService } from './witness.service';
import { WitnessController } from './witness.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WitnessController],
  providers: [WitnessService, PrismaService],
  imports: [PrismaModule],
})
export class WitnessModule {}

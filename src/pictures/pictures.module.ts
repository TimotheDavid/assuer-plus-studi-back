import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PicturesController],
  providers: [PicturesService, PrismaService],
  imports: [PrismaModule],
})
export class PicturesModule {}

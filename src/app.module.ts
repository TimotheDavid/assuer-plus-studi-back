import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WitnessModule } from './witness/witness.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AccidentsModule } from './accidents/accidents.module';
import { PicturesModule } from './pictures/pictures.module';

@Module({
  imports: [WitnessModule, UsersModule, AccidentsModule, PicturesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

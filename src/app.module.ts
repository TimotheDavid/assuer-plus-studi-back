import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WitnessModule } from './witness/witness.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AccidentsModule } from './accidents/accidents.module';
import { PicturesModule } from './pictures/pictures.module';
import { AuthenticationMiddleware } from './authentication/authentication.middleware';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    WitnessModule,
    UsersModule,
    AccidentsModule,
    PicturesModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('pictures', 'accidents', 'witness');
  }
}

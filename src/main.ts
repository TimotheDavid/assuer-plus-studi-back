import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    exposedHeaders: [
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Request-Method',
    ],
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Request-Method',
    ],
    origin: process.env.ORIGINS || '*',
  });
  await app.listen(process.env.PORT || 8080);
}

bootstrap();

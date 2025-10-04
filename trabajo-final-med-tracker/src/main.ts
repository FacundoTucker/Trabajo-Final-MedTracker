import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Esto hace que se validen todos los DTOs automáticamente
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // elimina propiedades no declaradas en el DTO
    forbidNonWhitelisted: true, // lanza error si vienen propiedades extras
    transform: true, // transforma tipos automáticamente, ej: string -> number
  }));

  await app.listen(3000);
}
bootstrap();


import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.static(join(__dirname, '..', 'public')));

  // Configuración CORS corregida
  app.enableCors({
    origin: [
      "https://trabajo-final-med-tracker-react-xi.vercel.app", // frontend Vercel
      "http://localhost:5173" // frontend local
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });

  // Valida todos los DTOs automáticamente
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // elimina propiedades no declaradas en el DTO
    forbidNonWhitelisted: true, // lanza error si vienen propiedades extras
    transform: true, // transforma tipos automáticamente
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();



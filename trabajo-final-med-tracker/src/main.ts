import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.static(join(__dirname, '..', 'public')));

  app.enableCors({
    origin: ["https://trabajo-final-medtracker.onrender.com","http://localhost:5173"], //URL donde corre React  //habilita para que venga algo de la nube 
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });

  //esto hace que se validen todos los DTOs automáticamente
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  //elimina propiedades no declaradas en el DTO
    forbidNonWhitelisted: true, //lanza error si vienen propiedades extras
    transform: true, // transforma tipos automaticamente
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();


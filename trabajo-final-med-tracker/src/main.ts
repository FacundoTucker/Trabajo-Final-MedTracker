import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Servir archivos estáticos (si los necesitas)
  app.use(express.static(join(__dirname, '..', 'public')));

  // 1️⃣ Middleware para OPTIONS (preflight)
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.sendStatus(200);
    }
    next();
  });

  // 2️⃣ Configuración CORS para todas las rutas
  app.enableCors({
    origin: [
      'https://trabajo-final-med-tracker-react-xi.vercel.app', // Frontend Vercel
      'http://localhost:5173' // Frontend local
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
  });

  // 3️⃣ Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,               // elimina propiedades extra
    forbidNonWhitelisted: true,    // lanza error si vienen propiedades extra
    transform: true                // transforma tipos automáticamente
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en puerto ${port}`);
}
bootstrap();




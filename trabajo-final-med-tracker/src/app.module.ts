import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EspecialistaModule } from './especialista/especialista.module';
import { PacienteModule } from './paciente/paciente.module';
import { HistoriaClinicaModule } from './historia-clinica/historia-clinica.module';
import { TurnoModule } from './turno/turno.module';
import { IndicacionMedicaModule } from './indicacion-medica/indicacion-medica.module';
import { AuthModule } from './auth/auth.module';
import { EvolutivoModule } from './evolutivo/evolutivo.module';

@Module({
  imports: [
    // 1️⃣ Carga automática de .env tanto en local como en Render
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2️⃣ Configuración segura para MySQL en Clever Cloud
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('MYSQL_ADDON_HOST'),
        port: parseInt(config.get<string>('MYSQL_ADDON_PORT') ?? '3306'),
        username: config.get<string>('MYSQL_ADDON_USER'),
        password: config.get<string>('MYSQL_ADDON_PASSWORD'),
        database: config.get<string>('MYSQL_ADDON_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,  // ⚠️ poner false en producción
        ssl: {
          rejectUnauthorized: false, // Clever Cloud requiere SSL
        },
      }),
    }),

    EspecialistaModule,
    PacienteModule,
    HistoriaClinicaModule,
    TurnoModule,
    IndicacionMedicaModule,
    AuthModule,
    EvolutivoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

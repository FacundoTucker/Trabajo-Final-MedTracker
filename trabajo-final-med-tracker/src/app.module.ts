import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspecialistaModule } from './especialista/especialista.module';
import { PacienteModule } from './paciente/paciente.module';
import { HistoriaClinicaModule } from './historia-clinica/historia-clinica.module';
import { TurnoModule } from './turno/turno.module';
import { IndicacionMedicaModule } from './indicacion-medica/indicacion-medica.module';

@Module({
  imports: [
    // 👇 Configuración global de la base de datos
    TypeOrmModule.forRoot({
      type: 'mysql', // o 'postgres' según uses
      host: 'localhost',
      port: 3306, // si usas MySQL; 5432 en caso de Postgres
      username: 'root', // tu usuario de BD
      password: 'Facundo2', // tu password de BD
      database: 'medtracker', // tu base de datos
      autoLoadEntities: true, // carga automática de entidades
      synchronize: false,
    }),

    // 👇 Módulos de tu dominio
    EspecialistaModule,
    PacienteModule,
    HistoriaClinicaModule,
    TurnoModule,
    IndicacionMedicaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


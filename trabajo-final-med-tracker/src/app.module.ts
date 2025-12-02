import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Facundo2',
      database: 'medtracker',
      autoLoadEntities: true,
      synchronize: false,
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


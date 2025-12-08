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
      host: 'process.env.MYSQL_HOST',
      port:  parseInt(process.env.MYSQL_PORT ?? '3306') ,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
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


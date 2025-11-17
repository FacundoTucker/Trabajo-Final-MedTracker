import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { Paciente } from './entities/paciente.entity';
import { HistoriaClinica } from '../historia-clinica/entities/historia-clinica.entity';
import { HistoriaClinicaService } from '../historia-clinica/historia-clinica.service';
import { EmailCheckModule } from '../email-check/email-check.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente, HistoriaClinica]),
    EmailCheckModule,
  ],
  controllers: [PacienteController],
  providers: [PacienteService, HistoriaClinicaService],
  exports: [PacienteService],
})
export class PacienteModule {}


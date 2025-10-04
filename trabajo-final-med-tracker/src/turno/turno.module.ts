import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { Turno } from './entities/turno.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Especialista } from '../especialista/entities/especialista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, Paciente, Especialista])],
  controllers: [TurnoController],
  providers: [TurnoService],
  exports: [TurnoService],
})
export class TurnoModule {}

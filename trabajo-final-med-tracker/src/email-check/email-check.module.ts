import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailCheckService } from './email-check.service';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Especialista } from '../especialista/entities/especialista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente, Especialista])],
  providers: [EmailCheckService],
  exports: [EmailCheckService],
})
export class EmailCheckModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialistaService } from './especialista.service';
import { EspecialistaController } from './especialista.controller';
import { Especialista } from './entities/especialista.entity';
import { Turno } from '../turno/entities/turno.entity';
import { TurnoModule } from '../turno/turno.module';
import { EmailCheckModule } from '../email-check/email-check.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Especialista, Turno]),
    EmailCheckModule,
    TurnoModule,
  ],
  controllers: [EspecialistaController],
  providers: [EspecialistaService],
  exports: [EspecialistaService],
})
export class EspecialistaModule {}


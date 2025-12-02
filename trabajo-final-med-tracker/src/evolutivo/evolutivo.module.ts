import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evolutivo } from './entities/evolutivo.entity';
import { EvolutivoService } from './evolutivo.service';
import { EvolutivoController } from './evolutivo.controller';
import { HistoriaClinica } from '../historia-clinica/entities/historia-clinica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evolutivo, HistoriaClinica]),
  ],
  controllers: [EvolutivoController],
  providers: [EvolutivoService],
})
export class EvolutivoModule {}


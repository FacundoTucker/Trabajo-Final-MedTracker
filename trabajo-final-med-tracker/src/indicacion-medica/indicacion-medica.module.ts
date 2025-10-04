import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicacionMedicaService } from './indicacion-medica.service';
import { IndicacionMedicaController } from './indicacion-medica.controller';
import { IndicacionMedica } from './entities/indicacion-medica.entity';
import { HistoriaClinica } from '../historia-clinica/entities/historia-clinica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndicacionMedica, HistoriaClinica])],
  controllers: [IndicacionMedicaController],
  providers: [IndicacionMedicaService],
  exports: [IndicacionMedicaService],
})
export class IndicacionMedicaModule {}


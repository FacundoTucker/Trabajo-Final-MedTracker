import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialistaService } from './especialista.service';
import { EspecialistaController } from './especialista.controller';
import { Especialista } from './entities/especialista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Especialista])],
  controllers: [EspecialistaController],
  providers: [EspecialistaService],
  exports: [EspecialistaService],
})
export class EspecialistaModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialistaService } from './especialista.service';
import { EspecialistaController } from './especialista.controller';
import { Especialista } from './entities/especialista.entity';
import { EmailCheckModule } from '../email-check/email-check.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Especialista]),
    EmailCheckModule,
  ],
  controllers: [EspecialistaController],
  providers: [EspecialistaService],
  exports: [EspecialistaService],
})
export class EspecialistaModule {}


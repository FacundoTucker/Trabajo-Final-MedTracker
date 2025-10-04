import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { CreateTurnoDto } from './dto/create-turno.dto';

@Controller('turno')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Post()
  create(@Body() dto: CreateTurnoDto) {
    return this.turnoService.create(dto);
  }

  @Get()
  findAll() {
    return this.turnoService.findAll();
  }

  @Get(':idTurno')
  findOne(@Param('idTurno') idTurno: string) {
    return this.turnoService.findOne(+idTurno);
  }

  @Delete(':idTurno')
  remove(@Param('idTurno') idTurno: string) {
    return this.turnoService.remove(+idTurno);
  }
}


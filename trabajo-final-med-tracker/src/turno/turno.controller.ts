import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { CreateTurnoDto } from './dto/create-turno.dto';

@Controller('turnos')
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

  @Get('paciente/:idPaciente')
  findByPaciente(@Param('idPaciente') idPaciente: string) {
    return this.turnoService.findByPaciente(+idPaciente);
  }

  @Get(':idTurno')
  findOne(@Param('idTurno') idTurno: string) {
    return this.turnoService.findOne(+idTurno);
  }

  @Delete(':idTurno')
  remove(@Param('idTurno') idTurno: string) {
    return this.turnoService.remove(+idTurno);
  }

  @Patch(':idTurno')
  update(@Param('idTurno') idTurno: string, @Body() body: any) {
    return this.turnoService.update(+idTurno, body);
  }
}


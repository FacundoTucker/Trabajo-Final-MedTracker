import { Controller, Get, Post, Delete, Param, Body, Patch, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';

@Controller('turno')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

    @Post()
  async create(@Body() dto: CreateTurnoDto) {
    const turno = await this.turnoService.create(dto);
    if (!turno) {
      throw new BadRequestException('No se puede crear el turno: fecha pasada o fuera del horario del especialista');
    }
    return turno;
  }

  @Get()
  findAll() {
    return this.turnoService.findAll();
  }

  @Get('paciente/:idPaciente')
  findByPaciente(@Param('idPaciente',ParseIntPipe) idPaciente: string) {
    return this.turnoService.findByPaciente(+idPaciente);
  }

    @Get(':idTurno')
  async findOne(@Param('idTurno', ParseIntPipe) idTurno: number) {
    const turno = await this.turnoService.findOne(idTurno);
    if (!turno) throw new NotFoundException(`Turno con id ${idTurno} no encontrado`);
    return turno;
  }

  @Delete(':idTurno')
  async remove(@Param('idTurno', ParseIntPipe) idTurno: number) {
    const result = await this.turnoService.remove(idTurno);
    if (!result) throw new NotFoundException(`Turno con id ${idTurno} no encontrado`);
    return result;
  }

@Patch(':idTurno')
  async update(
    @Param('idTurno', ParseIntPipe) idTurno: number,
    @Body() body: any
  ) {
    console.log("Body recibido:", body);
    const turno = await this.turnoService.update(idTurno, body);
    return turno;
  }

  @Patch(':id/estado')
updateEstado(
  @Param('id') id: number,
  @Body('estado') estado: string,
) {
  return this.turnoService.updateEstado(id, estado);
}


}


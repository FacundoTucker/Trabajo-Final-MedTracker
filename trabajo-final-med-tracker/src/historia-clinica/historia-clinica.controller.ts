import { Controller, Get, Post, Delete, Param, Body, Put, Patch } from '@nestjs/common';
import { HistoriaClinicaService } from './historia-clinica.service';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';

@Controller('historia-clinica')
export class HistoriaClinicaController {
  constructor(private readonly historiaService: HistoriaClinicaService) {}

  @Post()
  create(@Body() dto: CreateHistoriaClinicaDto) {
    return this.historiaService.create(dto);
  }

  @Get()
  findAll() {
    return this.historiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiaService.findOne(+id);
  }

  @Get('paciente/:idPaciente')
  async findByPaciente(@Param('idPaciente') idPaciente: string) {
    return this.historiaService.findByPaciente(+idPaciente);
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHistoriaClinicaDto) {
    return this.historiaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiaService.remove(+id);
  }
}


import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { EspecialistaService } from './especialista.service';
import { CreateEspecialistaDto } from './dto/create-especialista.dto';
import { UpdateEspecialistaDto } from './dto/update-especialista.dto';

@Controller('especialista')
export class EspecialistaController {
  constructor(private readonly especialistaService: EspecialistaService) {}

  @Post()
  create(@Body() dto: CreateEspecialistaDto) {
    return this.especialistaService.create(dto);
  }

  @Get()
  findAll() {
    return this.especialistaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialistaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEspecialistaDto) {
    return this.especialistaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialistaService.remove(+id);
  }
}


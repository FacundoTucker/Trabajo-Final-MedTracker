import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, BadRequestException, } from '@nestjs/common';
import { IndicacionMedicaService } from './indicacion-medica.service';
import { CreateIndicacionMedicaDto } from './dto/create-indicacion-medica.dto';
import { UpdateIndicacionMedicaDto } from './dto/update-indicacion-medica.dto';

@Controller('indicacion-medica')
export class IndicacionMedicaController {
  constructor(
    private readonly indicacionMedicaService: IndicacionMedicaService,
  ) {}

  @Post()
  async create(@Body() createIndicacionMedicaDto: CreateIndicacionMedicaDto) {
    try {
      return await this.indicacionMedicaService.create(createIndicacionMedicaDto);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al crear la indicación médica',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.indicacionMedicaService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener las indicaciones médicas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const indicacion = await this.indicacionMedicaService.findOne(+id);
      if (!indicacion) {
        throw new NotFoundException(`La indicación médica con id ${id} no existe`);
      }
      return indicacion;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        error.message || 'Error al obtener la indicación médica',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIndicacionMedicaDto: UpdateIndicacionMedicaDto) {
    try {
      const updated = await this.indicacionMedicaService.update(+id, updateIndicacionMedicaDto);
      if (!updated) {
        throw new NotFoundException(`No se pudo actualizar, indicación con id ${id} no encontrada`);
      }
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        error.message || 'Error al actualizar la indicación médica',
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deleted = await this.indicacionMedicaService.remove(+id);
      if (!deleted) {
        throw new NotFoundException(`No se encontró la indicación médica con id ${id}`);
      }
      return { message: `Indicacion médica con id ${id} eliminada correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        error.message || 'Error al eliminar la indicación médica',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}


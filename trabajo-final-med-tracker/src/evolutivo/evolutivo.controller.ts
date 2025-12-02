import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EvolutivoService } from './evolutivo.service';
import { CreateEvolutivoDto } from './dto/create-evolutivo.dto';
import { UpdateEvolutivoDto } from './dto/update-evolutivo.dto';

@Controller('evolutivo')
export class EvolutivoController {
  constructor(private readonly evolutivoService: EvolutivoService) {}

  @Post()
  async create(@Body() dto: CreateEvolutivoDto) {
    try {
      return await this.evolutivoService.create(dto);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al crear el evolutivo',
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.evolutivoService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener los evolutivos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const evo = await this.evolutivoService.findOne(+id);
      if (!evo) {
        throw new NotFoundException(`Evolutivo con id ${id} no encontrado`);
      }
      return evo;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        error.message || 'Error al obtener el evolutivo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEvolutivoDto,
  ) {
    try {
      const updated = await this.evolutivoService.update(+id, dto);
      if (!updated) {
        throw new NotFoundException(
          `No se pudo actualizar, evolutivo con id ${id} no encontrado`,
        );
      }
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        error.message || 'Error al actualizar el evolutivo',
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deleted = await this.evolutivoService.remove(+id);
      if (!deleted) {
        throw new NotFoundException(
          `No se encontró el evolutivo con id ${id}`,
        );
      }
      return { message: `Evolutivo con id ${id} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        error.message || 'Error al eliminar el evolutivo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

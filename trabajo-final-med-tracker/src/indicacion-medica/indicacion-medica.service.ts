import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndicacionMedica } from './entities/indicacion-medica.entity';
import { CreateIndicacionMedicaDto } from './dto/create-indicacion-medica.dto';
import { UpdateIndicacionMedicaDto } from './dto/update-indicacion-medica.dto';
import { HistoriaClinica } from '../historia-clinica/entities/historia-clinica.entity';

@Injectable()
export class IndicacionMedicaService {
  constructor(
    @InjectRepository(IndicacionMedica)
    private readonly indicacionRepo: Repository<IndicacionMedica>,

    @InjectRepository(HistoriaClinica)
    private readonly historiaRepo: Repository<HistoriaClinica>,
  ) {}

  async create(dto: CreateIndicacionMedicaDto): Promise<IndicacionMedica> {
    const historia = await this.historiaRepo.findOne({
      where: { idHistoriaClinica: dto.idHistoriaClinica },
    })
    if (!historia) {
      throw new NotFoundException(
        `Historia clínica con id ${dto.idHistoriaClinica} no encontrada`,
      );
    }

    const nuevaIndicacion = this.indicacionRepo.create({
      descripcion: dto.descripcion,
      fecha: new Date(),  //crea a la fecha del momento
      historiaClinica: historia,
    });

    return await this.indicacionRepo.save(nuevaIndicacion);
  }

  async findAll(): Promise<IndicacionMedica[]> {
    return await this.indicacionRepo.find({
      relations: ['historiaClinica'],
    });
  }

  async findOne(id: number): Promise<IndicacionMedica> {
    const indicacion = await this.indicacionRepo.findOne({
      where: { idIndicacionMedica: id },
      relations: ['historiaClinica'],
    });

    if (!indicacion) {
      throw new NotFoundException(
        `Indicación médica con id ${id} no encontrada`,
      );
    }

    return indicacion;
  }

  async update(id: number, dto: UpdateIndicacionMedicaDto): Promise<IndicacionMedica> {
    const indicacion = await this.findOne(id);

    if (dto.idHistoriaClinica) {
      const historia = await this.historiaRepo.findOne({
        where: { idHistoriaClinica: dto.idHistoriaClinica },
      });

      if (!historia) {
        throw new NotFoundException(
          `Historia clínica con id ${dto.idHistoriaClinica} no encontrada`,
        );
      }

      indicacion.historiaClinica = historia;
    }

    if (dto.descripcion !== undefined) {
      indicacion.descripcion = dto.descripcion;
    }

    return await this.indicacionRepo.save(indicacion);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.indicacionRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `No se pudo eliminar, indicación médica con id ${id} no encontrada`,
      );
    }

    return true;
  }
}



import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evolutivo } from './entities/evolutivo.entity';
import { CreateEvolutivoDto } from './dto/create-evolutivo.dto';
import { UpdateEvolutivoDto } from './dto/update-evolutivo.dto';
import { HistoriaClinica } from '../historia-clinica/entities/historia-clinica.entity';

@Injectable()
export class EvolutivoService {
  constructor(
    @InjectRepository(Evolutivo)
    private readonly evolutivoRepo: Repository<Evolutivo>,

    @InjectRepository(HistoriaClinica)
    private readonly historiaRepo: Repository<HistoriaClinica>,
  ) {}

  async create(dto: CreateEvolutivoDto): Promise<Evolutivo> {
    const historia = await this.historiaRepo.findOne({
      where: { idHistoriaClinica: dto.idHistoriaClinica },
    });

    if (!historia) {
      throw new NotFoundException(
        `Historia clínica con id ${dto.idHistoriaClinica} no encontrada`,
      );
    }

    const nuevoEvolutivo = this.evolutivoRepo.create({
      descripcion: dto.descripcion,
      fecha: new Date(), // Fecha actual, igual que en indicación
      historiaClinica: historia,
    });

    return await this.evolutivoRepo.save(nuevoEvolutivo);
  }

  async findAll(): Promise<Evolutivo[]> {
    return await this.evolutivoRepo.find({
      relations: ['historiaClinica'],
    });
  }

  async findOne(id: number): Promise<Evolutivo> {
    const evolutivo = await this.evolutivoRepo.findOne({
      where: { idEvolutivo: id },
      relations: ['historiaClinica'],
    });

    if (!evolutivo) {
      throw new NotFoundException(`Evolutivo con id ${id} no encontrado`);
    }

    return evolutivo;
  }

  async update(id: number, dto: UpdateEvolutivoDto): Promise<Evolutivo> {
    const evolutivo = await this.findOne(id);

    if (dto.idHistoriaClinica) {
      const historia = await this.historiaRepo.findOne({
        where: { idHistoriaClinica: dto.idHistoriaClinica },
      });

      if (!historia) {
        throw new NotFoundException(
          `Historia clínica con id ${dto.idHistoriaClinica} no encontrada`,
        );
      }

      evolutivo.historiaClinica = historia;
    }

    if (dto.descripcion !== undefined) {
      evolutivo.descripcion = dto.descripcion;
    }

    return await this.evolutivoRepo.save(evolutivo);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.evolutivoRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Evolutivo con id ${id} no encontrado`,
      );
    }

    return true;
  }
}

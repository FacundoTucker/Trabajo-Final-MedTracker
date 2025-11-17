import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';
import { Paciente } from '../paciente/entities/paciente.entity';

@Injectable()
export class HistoriaClinicaService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private readonly historiaRepo: Repository<HistoriaClinica>,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
  ) {}

  async create(dto: CreateHistoriaClinicaDto): Promise<HistoriaClinica> {
    const paciente = await this.pacienteRepo.findOne({ where: { idPaciente: dto.idPaciente } });  //crea la historia clinica y se la asigna a su paciente
    if (!paciente) throw new NotFoundException(`Paciente con id ${dto.idPaciente} no encontrado`);

    const nuevaHistoriaClinica = this.historiaRepo.create({ paciente: paciente });
    return await this.historiaRepo.save(nuevaHistoriaClinica);
  }

  async findAll(): Promise<HistoriaClinica[]> {
    return await this.historiaRepo.find({ relations: ['paciente', 'indicaciones'] });
  }

  async findOne(id: number): Promise<HistoriaClinica> {
    const historia = await this.historiaRepo.findOne({
      where: { idHistoriaClinica: id },
      relations: ['paciente', 'indicaciones'],
    });
    if (!historia) throw new NotFoundException(`Historia clínica con id ${id} no encontrada`);
    return historia;
  }

  async update(id: number, dto: UpdateHistoriaClinicaDto): Promise<HistoriaClinica> {
    const historia = await this.findOne(id);

    if (dto.idPaciente) {
      const paciente = await this.pacienteRepo.findOne({ where: { idPaciente: dto.idPaciente } });
      if (!paciente) throw new NotFoundException(`Paciente con id ${dto.idPaciente} no encontrado`);
      historia.paciente = paciente;
    }

    return await this.historiaRepo.save(historia);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.historiaRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Historia clínica con id ${id} no encontrada`);
    return true;
  }
}


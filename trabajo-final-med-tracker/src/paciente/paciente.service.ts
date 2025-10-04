import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepo: Repository<Paciente>,
  ) {}

  async create(dto: CreatePacienteDto): Promise<Paciente> {
    const paciente = this.pacienteRepo.create(dto);
    return await this.pacienteRepo.save(paciente);
  }

  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepo.find({ relations: ['historiaClinica', 'turnos'] });
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacienteRepo.findOne({
      where: { idPaciente: id },
      relations: ['historiaClinica', 'turnos'],
    });
    if (!paciente) throw new NotFoundException(`Paciente con id ${id} no encontrado`);
    return paciente;
  }

  async update(id: number, dto: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.findOne(id);
    Object.assign(paciente, dto);
    return await this.pacienteRepo.save(paciente);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.pacienteRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Paciente con id ${id} no encontrado`);
    return true;
  }
}


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialista } from './entities/especialista.entity';
import { CreateEspecialistaDto } from './dto/create-especialista.dto';
import { UpdateEspecialistaDto } from './dto/update-especialista.dto';

@Injectable()
export class EspecialistaService {
  constructor(
    @InjectRepository(Especialista)
    private readonly especialistaRepo: Repository<Especialista>,
  ) {}

  async create(dto: CreateEspecialistaDto): Promise<Especialista> {
    const especialista = this.especialistaRepo.create(dto);
    return await this.especialistaRepo.save(especialista);
  }

  async findAll(): Promise<Especialista[]> {
    return await this.especialistaRepo.find({relations: ["turnos"] });   //junto al especialista traemos sus turnos asignados
  }

  async findOne(id: number): Promise<Especialista> {
    const especialista = await this.especialistaRepo.findOne({
      where: { idEspecialista: id },
      relations: ["turnos"]
    });
    if (!especialista) throw new NotFoundException(`Especialista con id ${id} no encontrado`);
    return especialista;
  }

  async update(id: number, dto: UpdateEspecialistaDto): Promise<Especialista> {
    const especialista = await this.findOne(id);
    Object.assign(especialista, dto);
    return await this.especialistaRepo.save(especialista);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.especialistaRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Especialista con id ${id} no encontrado`);
    return true;
  }
}


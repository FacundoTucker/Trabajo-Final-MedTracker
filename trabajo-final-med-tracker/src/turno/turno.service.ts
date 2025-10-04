import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Especialista } from '../especialista/entities/especialista.entity';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepo: Repository<Turno>,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
    @InjectRepository(Especialista)
    private readonly especialistaRepo: Repository<Especialista>,
  ) {}

  //create
  async create(dto: CreateTurnoDto): Promise<Turno> {
    const paciente = await this.pacienteRepo.findOne({ where: { idPaciente: dto.idPaciente } });
    if (!paciente) throw new NotFoundException(`Paciente con id ${dto.idPaciente} no encontrado`);

    const especialista = await this.especialistaRepo.findOne({ where: { idEspecialista: dto.idEspecialista } });
    if (!especialista) throw new NotFoundException(`Especialista con id ${dto.idEspecialista} no encontrado`);

    const turno = this.turnoRepo.create({
      idPaciente: dto.idPaciente,
      idEspecialista: dto.idEspecialista,
      fechaTurno: dto.fechaTurno,
      estado: dto.estado,
      paciente,
      especialista,
    });

    return await this.turnoRepo.save(turno);
  }

  async findAll(): Promise<Turno[]> {
    return await this.turnoRepo.find({ relations: ['paciente', 'especialista'] });
  }

  async findOne(idTurno: number): Promise<Turno> {
    const turno = await this.turnoRepo.findOne({
      where: { idTurno },
      relations: ['paciente', 'especialista'],
    });
    if (!turno) throw new NotFoundException(`Turno no encontrado`);
    return turno;
  }

  async remove(idTurno: number): Promise<boolean> {
    const result = await this.turnoRepo.delete({ idTurno});
    if (result.affected === 0) throw new NotFoundException(`Turno no encontrado`);
    return true;
  }
}


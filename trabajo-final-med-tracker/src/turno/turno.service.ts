import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
  
  // CREATE
  async create(dto: CreateTurnoDto): Promise<Turno> {
    const paciente = await this.pacienteRepo.findOne({
      where: { idPaciente: dto.idPaciente },
    });
    if (!paciente)
      throw new NotFoundException(
        `Paciente con id ${dto.idPaciente} no encontrado`,
      );

    const especialista = await this.especialistaRepo.findOne({
      where: { idEspecialista: dto.idEspecialista },
    });
    if (!especialista)
      throw new NotFoundException(
        `Especialista con id ${dto.idEspecialista} no encontrado`,
      );

    this.validateFechaTurno(dto.fechaTurno);

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

  // GET ALL
  async findAll(): Promise<Turno[]> {
    return await this.turnoRepo.find({
      relations: ['paciente', 'especialista'],
    });
  }

  // GET ONE
  async findOne(idTurno: number): Promise<Turno> {
    const turno = await this.turnoRepo.findOne({
      where: { idTurno },
      relations: ['paciente', 'especialista'],
    });
    if (!turno) throw new NotFoundException(`Turno no encontrado`);
    return turno;
  }

private validateFechaTurno(fechaTurno: string | Date) {
  const fecha = new Date(fechaTurno);

  if (isNaN(fecha.getTime())) {
    throw new BadRequestException("Fecha inválida");
  }

  // ❌ No permitir fechas pasadas
  const ahora = new Date();
  if (fecha < ahora) {
    throw new BadRequestException("No podés elegir una fecha pasada");
  }

  const day = fecha.getDay(); // 0 domingo, 6 sábado
  if (day === 0 || day === 6) {
    throw new BadRequestException("No hay turnos fin de semana");
  }

  const hour = fecha.getHours();
  if (hour < 8 || hour >= 16) {
    throw new BadRequestException("El horario debe estar entre 08:00 y 16:00");
  }
}


  // UPDATE
async update(idTurno: number, data: Partial<Turno>) {
  const turno = await this.turnoRepo.findOne({ where: { idTurno } });

  if (!turno) {
    throw new NotFoundException(`Turno no encontrado`);
  }

  // ⬅️ Validación de fecha y hora (solo si está intentando cambiar fechaTurno)
  if (data.fechaTurno) {
    this.validateFechaTurno(data.fechaTurno);
  }

  await this.turnoRepo.update(idTurno, data);

  return this.turnoRepo.findOne({
    where: { idTurno },
    relations: ['paciente', 'especialista'],
  });
}

    
  // DELETE
  async remove(idTurno: number) {
  try {
    const result = await this.turnoRepo.delete({ idTurno });

    if (result.affected === 0) {
      return null; // El controller tirará el NotFound
    }

    return { message: "Turno eliminado correctamente" };
  } catch (error) {
    return null;
  }
}

  async findByPaciente(idPaciente: number) {
  console.log("Buscando turnos para paciente:", idPaciente);

  const turnos = await this.turnoRepo.find({
    where: { idPaciente },
    relations: ['paciente', 'especialista'], 
    order: { fechaTurno: 'ASC' }
  });

  console.log("Turnos encontrados:", turnos);
  return turnos;
}

async updateEstado(id: number, estado: string) {
  const turno = await this.turnoRepo.findOne({ where: { idTurno: id } });

  if (!turno) {
    throw new NotFoundException('Turno no encontrado');
  }

  turno.estado = estado; // "Confirmado" | "Rechazado" | "Reservado" etc

  return this.turnoRepo.save(turno);
}


}

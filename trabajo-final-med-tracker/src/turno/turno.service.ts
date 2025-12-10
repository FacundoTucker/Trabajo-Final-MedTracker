// TURNOS CADA 30 MINUTOS 
// NI SABADOS NI DOMINGOS

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

  // VALIDACIÓN FECHA Y HORARIO
  private validateFechaTurno(fechaTurno: string | Date) {
    const fecha = new Date(fechaTurno);

    const fechaLocal = new Date (
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      fecha.getHours(),
      fecha.getMinutes(),
      0,
      0
    )

    if (isNaN(fecha.getTime())) {
      throw new BadRequestException("Fecha inválida");
    }

    const ahora = new Date();
    if (fechaLocal < ahora) {
      throw new BadRequestException("No podés elegir una fecha pasada");
    }

    const day = fecha.getDay(); // 0 domingo, 6 sábado
    if (day === 0 || day === 6) {
      throw new BadRequestException("No hay turnos en fin de semana");
    }

     // Tomar hora y minutos directamente del string YYYY-MM-DDTHH:mm
  const [horaStr, minStr] = fechaTurno.toString().split('T')[1].split(':');
  const hora = Number(horaStr);
  const minutos = Number(minStr);

    // Última franja válida: 15:30
    if (hora < 8 || (hora === 15 && minutos > 30) || hora > 15) {
      throw new BadRequestException("El horario debe estar entre 08:00 y 16:00");
    }
  }

  // UPDATE
  async update(idTurno: number, data: Partial<Turno>) {
    const turno = await this.turnoRepo.findOne({ where: { idTurno } });

    if (!turno) {
      throw new NotFoundException(`Turno no encontrado`);
    }

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
    const result = await this.turnoRepo.delete({ idTurno });
    if (result.affected === 0) {
      return null; // El controller tirará NotFound
    }
    return { message: "Turno eliminado correctamente" };
  }

  // FIND BY PACIENTE
  async findByPaciente(idPaciente: number) {
    const turnos = await this.turnoRepo.find({
      where: { idPaciente },
      relations: ['paciente', 'especialista'],
      order: { fechaTurno: 'ASC' },
    });
    return turnos;
  }

  // UPDATE ESTADO
  async updateEstado(id: number, estado: string) {
    const turno = await this.turnoRepo.findOne({ where: { idTurno: id } });
    if (!turno) {
      throw new NotFoundException('Turno no encontrado');
    }
    turno.estado = estado; // "Confirmado" | "Rechazado" | "Reservado"
    return this.turnoRepo.save(turno);
  }
}

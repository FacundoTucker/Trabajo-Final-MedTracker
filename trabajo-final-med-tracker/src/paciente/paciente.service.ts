import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { HistoriaClinicaService } from '../historia-clinica/historia-clinica.service';
import { EmailCheckService } from 'src/email-check/email-check.service';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepo: Repository<Paciente>,
    private readonly historiaClinicaService: HistoriaClinicaService,
    private readonly emailCheckService: EmailCheckService,
  ) {}

  async create(dto: CreatePacienteDto): Promise<Paciente> {
  //validación de correo repetido entre pacientes y especialistas
  if (await this.emailCheckService.emailExists(dto.correoElectronico)) {
    throw new BadRequestException('El correo ya está registrado por otro usuario.');
  }

  try {
    const paciente = this.pacienteRepo.create(dto);
    const pacienteGuardado = await this.pacienteRepo.save(paciente);

    //crear historia clínica automaticamente
    await this.historiaClinicaService.create({
      idPaciente: pacienteGuardado.idPaciente,
    });
    return pacienteGuardado;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
      throw new BadRequestException(
        'Ya existe un paciente con ese DNI o correo electrónico.',
      );
    }
    throw new InternalServerErrorException(
      'Error inesperado al crear el paciente',
    );
  }
}


  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepo.find({
      relations: ['historiaClinica', 'turnos'],
    });
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
    if (dto.correoElectronico && await this.emailCheckService.emailExists(dto.correoElectronico)) {
      throw new BadRequestException('Ese correo ya está utilizado por otro usuario.');
    }
    Object.assign(paciente, dto);
    return await this.pacienteRepo.save(paciente);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.pacienteRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Paciente con id ${id} no encontrado`);
    return true;
  }
  async findByDni(dni: number): Promise<Paciente> {
  const paciente = await this.pacienteRepo.findOne({
    where: { DNI: dni },
    relations: ['historiaClinica', 'turnos'],
  });

  if (!paciente) {
    throw new NotFoundException(`No existe un paciente con DNI ${dni}`);
  }

  return paciente;
}

}



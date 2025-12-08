import { 
  Injectable, 
  NotFoundException, 
  BadRequestException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialista } from './entities/especialista.entity';
import { Turno } from '../turno/entities/turno.entity';
import { CreateEspecialistaDto } from './dto/create-especialista.dto';
import { UpdateEspecialistaDto } from './dto/update-especialista.dto';
import { EmailCheckService } from '../email-check/email-check.service';

@Injectable()
export class EspecialistaService {
  constructor(
    @InjectRepository(Especialista)
    private readonly especialistaRepo: Repository<Especialista>,
    private readonly emailCheckService: EmailCheckService,

    @InjectRepository(Turno)
    private readonly turnoRepo: Repository<Turno>,
  ) {}

  async findTurnos(idEspecialista: number) {
    return this.turnoRepo.find({
      where: {idEspecialista},
      relations: ['paciente'],
      order: {fechaTurno: 'ASC',}
    });
  }

  async create(dto: CreateEspecialistaDto): Promise<Especialista> {
    if (await this.emailCheckService.emailExists(dto.correoElectronico)) {
      throw new BadRequestException('El correo ya está registrado por otro usuario.');
    }
    try {
      const especialista = this.especialistaRepo.create(dto);
      return await this.especialistaRepo.save(especialista);

    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
        throw new BadRequestException(
          'Ya existe un especialista con ese DNI, o matrícula.',
        );
      }
      throw new InternalServerErrorException(
        'Error inesperado al crear el especialista',
      );
    }
  }

  async findAll(): Promise<Especialista[]> {
    return await this.especialistaRepo.find();
  }

  async findOne(id: number): Promise<Especialista> {
    const especialista = await this.especialistaRepo.findOne({
      where: { idEspecialista: id },
    });

    if (!especialista) {
      throw new NotFoundException(`Especialista con id ${id} no encontrado`);
    }

    return especialista;
  }

  async update(id: number, dto: UpdateEspecialistaDto): Promise<Especialista> {
    const especialista = await this.findOne(id);

    if (
    dto.correoElectronico &&
    dto.correoElectronico !== especialista.correoElectronico &&
    await this.emailCheckService.emailExists(dto.correoElectronico)
  ) {
    throw new BadRequestException('Ese correo ya está utilizado por otro usuario.');
  }

  // ✔ Verificar DNI repetido (solo si lo cambia)
  if (dto.DNI && dto.DNI !== especialista.DNI) {
    const dniExiste = await this.especialistaRepo.findOne({
      where: { DNI: dto.DNI },
    });

    if (dniExiste && dniExiste.idEspecialista !== id) {
      throw new BadRequestException('Ese DNI ya pertenece a otro especialista.');
    }
  }

  // ✔ Verificar matrícula repetida (solo si la cambia)
  if (dto.nroMatricula && dto.nroMatricula !== especialista.nroMatricula) {
    const matriculaExiste = await this.especialistaRepo.findOne({
      where: { nroMatricula: dto.nroMatricula },
    });

    if (matriculaExiste && matriculaExiste.idEspecialista !== id) {
      throw new BadRequestException(
        'Ese número de matrícula ya pertenece a otro especialista.',
      );
    }
  }
    Object.assign(especialista, dto);

    try {
      return await this.especialistaRepo.save(especialista);

    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
        throw new BadRequestException(
          'Los datos ingresados ya pertenecen a otro especialista.',
        );
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Error inesperado al actualizar el especialista',
      );
    }
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.especialistaRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Especialista con id ${id} no encontrado`);
    }

    return true;
  }
}




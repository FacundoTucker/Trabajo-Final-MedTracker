import { 
  Injectable, 
  NotFoundException, 
  BadRequestException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialista } from './entities/especialista.entity';
import { CreateEspecialistaDto } from './dto/create-especialista.dto';
import { UpdateEspecialistaDto } from './dto/update-especialista.dto';
import { EmailCheckService } from 'src/email-check/email-check.service';

@Injectable()
export class EspecialistaService {
  constructor(
    @InjectRepository(Especialista)
    private readonly especialistaRepo: Repository<Especialista>,
    private readonly emailCheckService: EmailCheckService,
  ) {}

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
          'Ya existe un especialista con ese DNI, correo electrónico o matrícula.',
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

    if (dto.correoElectronico && await this.emailCheckService.emailExists(dto.correoElectronico)) {
      throw new BadRequestException('Ese correo ya está utilizado por otro usuario.');
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



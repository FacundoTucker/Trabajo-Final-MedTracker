import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Paciente } from '../paciente/entities/paciente.entity';
import { Especialista } from '../especialista/entities/especialista.entity';

@Injectable()
export class EmailCheckService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,

    @InjectRepository(Especialista)
    private readonly especialistaRepo: Repository<Especialista>,
  ) {}

  async emailExists(email: string): Promise<boolean> {
    const paciente = await this.pacienteRepo.findOne({
      where: { correoElectronico: email },
    });

    const especialista = await this.especialistaRepo.findOne({
      where: { correoElectronico: email },
    });

    return !!paciente || !!especialista;
  }
}

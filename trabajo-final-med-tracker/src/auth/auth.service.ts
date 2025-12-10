import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Especialista } from "../especialista/entities/especialista.entity";
import { Paciente } from "../paciente/entities/paciente.entity";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Especialista)
    private readonly especialistaRepo: Repository<Especialista>,

    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
  ) {}

  async login(dto: LoginDto) {
    const { correoElectronico, contraseña } = dto;

    // Buscar especialista
    const especialista = await this.especialistaRepo.findOne({
      where: { correoElectronico, contraseña },
    });

    if (especialista) {
      return {
        tipo: "especialista",
        id: especialista.idEspecialista,
        nombre: especialista.nombre,
      };
    }

    // Buscar paciente
    const paciente = await this.pacienteRepo.findOne({
      where: { correoElectronico, contraseña },
    });

    if (paciente) {
      return {
        tipo: "paciente",
        id: paciente.idPaciente,
        nombre: paciente.nombre,
        dni:paciente.DNI,
      };
    }

    throw new UnauthorizedException("Credenciales incorrectas");
  }
}

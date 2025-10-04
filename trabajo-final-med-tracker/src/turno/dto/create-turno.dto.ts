import { IsInt, IsNotEmpty, IsDateString, IsString, MaxLength } from 'class-validator';

export class CreateTurnoDto {
  @IsInt()
  @IsNotEmpty()
  idPaciente: number;

  @IsInt()
  @IsNotEmpty()
  idEspecialista: number;

  @IsDateString()
  @IsNotEmpty()
  fechaTurno: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  estado: string;
}



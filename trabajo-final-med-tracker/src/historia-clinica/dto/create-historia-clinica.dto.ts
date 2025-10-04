import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateHistoriaClinicaDto {
  @IsInt()
  @IsNotEmpty()
  idPaciente: number;
}




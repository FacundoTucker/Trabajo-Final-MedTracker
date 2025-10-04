import { IsInt, IsNotEmpty, IsString, MaxLength, IsDateString } from 'class-validator';

export class CreateIndicacionMedicaDto {
  @IsInt()
  @IsNotEmpty()
  idHistoriaClinica: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  descripcion: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;
}




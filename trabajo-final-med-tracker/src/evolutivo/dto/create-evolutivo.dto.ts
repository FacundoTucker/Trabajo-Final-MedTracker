import { IsInt, IsNotEmpty, IsString, MaxLength, IsDateString } from 'class-validator';

export class CreateEvolutivoDto {
  @IsInt()
  @IsNotEmpty()
  idHistoriaClinica: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  descripcion: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;
}

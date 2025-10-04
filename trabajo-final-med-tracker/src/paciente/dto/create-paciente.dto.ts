import { IsString, IsNotEmpty, IsDateString, IsInt, IsEmail, MaxLength } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  apellido: string;

  @IsDateString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsInt()
  @IsNotEmpty()
  DNI: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  domicilio: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(60)
  correoElectronico: string;

  @IsInt()
  @IsNotEmpty()
  nroTelefono: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  contraseña: string;
}




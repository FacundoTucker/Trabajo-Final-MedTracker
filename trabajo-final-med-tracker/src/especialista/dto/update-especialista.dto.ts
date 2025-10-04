import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecialistaDto } from './create-especialista.dto';

export class UpdateEspecialistaDto extends PartialType(CreateEspecialistaDto) {}

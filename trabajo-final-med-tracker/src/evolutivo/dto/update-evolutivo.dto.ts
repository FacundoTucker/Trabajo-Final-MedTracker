import { PartialType } from '@nestjs/mapped-types';
import { CreateEvolutivoDto } from './create-evolutivo.dto';

export class UpdateEvolutivoDto extends PartialType(CreateEvolutivoDto) {}

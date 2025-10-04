import { PartialType } from '@nestjs/mapped-types';
import { CreateIndicacionMedicaDto } from './create-indicacion-medica.dto';

export class UpdateIndicacionMedicaDto extends PartialType(CreateIndicacionMedicaDto) {}


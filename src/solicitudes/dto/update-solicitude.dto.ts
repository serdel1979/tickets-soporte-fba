import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudDto } from './create-solicitude.dto';

export class UpdateSolicitudDto extends PartialType(CreateSolicitudDto) {}

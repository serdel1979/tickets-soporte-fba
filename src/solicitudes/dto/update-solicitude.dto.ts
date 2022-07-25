import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudDto } from './create-solicitude.dto';

export class UpdateSolicitudeDto extends PartialType(CreateSolicitudDto) {}

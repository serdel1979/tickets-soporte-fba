import { Module } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SOLICITUD } from '../common/models/models';
import { SolicitudSchema } from 'src/users/schema/solicitud.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: SOLICITUD.name,
      useFactory: () => {
        return SolicitudSchema;
      },
    },
    ]),
  ],
  controllers: [SolicitudesController],
  providers: [SolicitudesService]
})
export class SolicitudesModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISolicitud } from 'src/common/interfaces/solicitud.interface';
import { SOLICITUD } from 'src/common/models/models';
import { CreateSolicitudDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudDto} from './dto/update-solicitude.dto';

@Injectable()
export class SolicitudesService {

  constructor(@InjectModel(SOLICITUD.name) private readonly model: Model<ISolicitud>){}

  async create(createSolicitudeDto: CreateSolicitudDto):Promise<ISolicitud> {
    const newSolicitud = new this.model({ ...createSolicitudeDto});
    return await newSolicitud.save();
  }

  findAll() {
    return this.model.find().sort({createdAt:1});
  }

  
  findByUser(depto: string) {
    return this.model.find({departamento:depto});
  }

  async findOne(id: string) {
    return await this.model.findById({_id:id}).exec();
  }

  async update(id: string, updateSolicitudDto: UpdateSolicitudDto) {
    const  solicitud = {...updateSolicitudDto}
    return await this.model.findByIdAndUpdate(id,solicitud,{new : true});
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}

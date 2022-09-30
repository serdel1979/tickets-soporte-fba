import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISolicitud } from 'src/common/interfaces/solicitud.interface';
import { SOLICITUD } from 'src/common/models/models';
import { CreateSolicitudDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudDto } from './dto/update-solicitude.dto';

@Injectable()
export class SolicitudesService {

  constructor(@InjectModel(SOLICITUD.name) private readonly model: Model<ISolicitud>) { }

  async create(createSolicitudeDto: CreateSolicitudDto): Promise<ISolicitud> {
    const newSolicitud = new this.model({ ...createSolicitudeDto });
    return await newSolicitud.save();
  }

  findAll() {
    return this.model.find({}).sort({ createdAt: -1 });
  }


  findByUser(depto: string) {
    return this.model.find({ departamento: depto }).sort({ createdAt: -1 });;
  }



  findByUserAdmin(depto: string) {
    return this.model.find({ departamento: depto }).sort({ createdAt: -1 });;
  }


  //findByUserToday(depto: string) {
  //  let desde: string = "T00:00:00.000Z";
  //  let hast: string = "T23:59:59.999Z";
  //  let hoy = new Date();
  //  let sindate = hoy.toISOString().split("T")[0];
  //  let filtrodesde = sindate + desde;
  //  let filtrohasta = sindate + hast;
  //  let afechadesde = new Date(filtrodesde);
  //  let afechahasta = new Date(filtrohasta);
  //  return this.model.find({ departamento: depto }).find({ $and: [
  //    { createdAt: { $gte: afechadesde } },
  //    { createdAt: { $lte: afechahasta } }
  //  ]}).sort({ createdAt: -1 });;
 // }


 //traigo los vistos y los pendientes, no los del dia
  findByUserToday(depto: string) {
    return this.model.find({ departamento: depto }).find({$and: [{estado: {$ne:"SOLUCIONADO"}},{ estado: {$ne:"CERRADO"}}]}).sort({ createdAt: -1 });;
  }

  //console.log(fechaActual.toLocaleDateString('ar-EG', { year:"numeric", month:"short", weekday:"long"}))
  convertDateFormat(fecha: string) {
    let formato = fecha.split('/')
    let p1=formato[0];
    let p2 = formato[2];
    formato[2]=p1;
    formato[0]=p2;
    let fechaf = formato[0]+'-'+formato[1]+'-'+formato[2];
    //return fecha.split('/').reverse().join('-');
    return fechaf;
  }

  //findSolicitudsToday() {   //.toLocaleDateString();
  //  let desde: string = "T00:00:00.000Z";
  //  let hast: string = "T23:59:59.999Z";
  //  let hoy = new Date();
  //  let sindate = hoy.toISOString().split("T")[0];
  //  let filtrodesde = sindate + desde;
  //  let filtrohasta = sindate + hast;
  //  let afechadesde = new Date(filtrodesde);
  //  let afechahasta = new Date(filtrohasta);
  //  return this.model.find({ $and: [
  //    { createdAt: { $gte: afechadesde } },
  //    { createdAt: { $lte: afechahasta } }
  //  ]}).sort({ createdAt: -1 });
 // }

//ahora no traigo los del día, sino los "NO SOLUCIONADOS"
  findSolicitudsToday() {   //.toLocaleDateString();
    return this.model.find({$and: [{estado: {$ne:"SOLUCIONADO"}},{ estado: {$ne:"CERRADO"}}]}).sort({ createdAt: -1 });
  }



  async findOne(id: string) {
    return await this.model.findById({ _id: id }).exec();
  }

  async update(id: string, updateSolicitudDto: UpdateSolicitudDto) {
    const solicitud = { ...updateSolicitudDto }
    return await this.model.findByIdAndUpdate(id, solicitud, { new: true });
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}

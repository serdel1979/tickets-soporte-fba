import * as mongoose from 'mongoose';

export const SolicitudSchema = new mongoose.Schema({
    descripcion:{ type: String, required: true },
    departamento:{ type: String, required: true },
    usuario:{ type: String, required: true },
    equipo:{ type: String, required: true },
    estado:{ type: String},
    informe:{ type: String},
    tecnico:{ type: String},
},{timestamps: true},);

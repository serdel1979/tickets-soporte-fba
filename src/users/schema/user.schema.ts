import * as mongoose from 'mongoose';
import { Role } from 'src/common/role/role.enum';

export const UserSchema = new mongoose.Schema({
    user:{ type: String, unique:true, required: true },
    password:{ type: String, required: true },
    roles:{ type: Array, required: true },
    equipment:[{type: mongoose.Schema.Types.ObjectId, ref: 'equipments'}],
},{timestamps: true},);

UserSchema.index({user:1},{unique: true});
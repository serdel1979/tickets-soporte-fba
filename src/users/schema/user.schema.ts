import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    user:{ type: String, unique:true, required: true },
    password:{ type: String, required: true },
    equipment:[{type: mongoose.Schema.Types.ObjectId, ref: 'equipments'}],
},{timestamps: true},);

UserSchema.index({user:1},{unique: true});
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interface';
import { exec } from 'child_process';

@Injectable()
export class UsersService {


  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) { }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: UserDto):Promise<IUser>{
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = new this.model({ ...createUserDto, password: hash });
    return await newUser.save();
  }

  findAll() {
    return this.model.find().sort({user:1});
  }

  async findOne(id: string) {
    return await this.model.findById({_id:id}).exec();
  }

 
  async update(id: string, updateUserDto: UpdateUserDto):Promise<IUser> {
    let user;
    if (updateUserDto.password){
       const hash = await this.hashPassword(updateUserDto.password);
       user = {...updateUserDto, password: hash}
    }else{
       user = {...updateUserDto}
    }
    return await this.model.findByIdAndUpdate(id,user,{new : true});
  }

  async remove(id: string) {
    //await this.model.findByIdAndDelete(id);
    return await this.model.findByIdAndDelete(id);
  }
}

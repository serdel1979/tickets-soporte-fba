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

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  async update(id: string, updateUserDto: UserDto):Promise<IUser> {
    const hash = await this.hashPassword(updateUserDto.password);
    const user = {...updateUserDto, password: hash}
    return await this.model.findByIdAndUpdate(id,user,{new : true});
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK , msg: 'deleted' }
  }
}

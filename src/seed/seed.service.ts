import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/common/interfaces/user.interface';
import { USER } from 'src/common/models/models';
import { UserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class SeedService {
  

  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) { }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async seed(createUserDto: UserDto):Promise<IUser>{
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = new this.model({ ...createUserDto, password: hash });
    return await newUser.save();
  }

 
}

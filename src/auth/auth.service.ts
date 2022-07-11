import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interface';
import { USER } from 'src/common/models/models';
import { LoginAuthDto } from './dto/login-auth.dto';
import { bcrypt, compare } from 'bcrypt';

@Injectable()
export class AuthService {


  constructor(@InjectModel(USER.name) private readonly userModel: Model<IUser>) { }


  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  
  async login(createAuthDto: LoginAuthDto) {
      const { user, password } = createAuthDto;
      const findUser = await this.userModel.findOne({user})
      if(!findUser) throw new HttpException('Usuario o clave incorrecto',403)
      
      const checkPassword = await compare(password,findUser.password);
      if(!checkPassword) throw new HttpException('Usuario o clave incorrecto',403); 
      const data = findUser;      


      return data;
  }

  
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interface';
import { USER } from 'src/common/models/models';
import { LoginAuthDto } from './dto/login-auth.dto';
import { bcrypt, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


  constructor(@InjectModel(USER.name) private readonly userModel: Model<IUser>,
  private jwtService: JwtService) { }


  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  
  async login(userAuthDto: LoginAuthDto) {
      const { user, password } = userAuthDto;
      const findUser = await this.userModel.findOne({user})
      if(!findUser) throw new HttpException('Usuario o clave incorrecto',403)
      
      const checkPassword = await compare(password,findUser.password);
      if(!checkPassword) throw new HttpException('Usuario o clave incorrecto',403); 
      
      
      const payload = {id:findUser._id, user:findUser.user, roles: findUser.roles}
     
      const token = await this.jwtService.sign(payload);
      
      const data = {
        user: findUser,
        token,
      }  
      return data;
  }

  
}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/user.schema';
import { USER } from 'src/common/models/models';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/role/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: USER.name,
      useFactory: () => {
        return UserSchema;
      },
    },
    ]),
    JwtModule.register({
      secret: "clavesecreta",
      signOptions: { expiresIn: '48h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }

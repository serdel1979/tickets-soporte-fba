import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/user.schema';
import { USER } from 'src/common/models/models';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: USER.name,
      useFactory: () => {
        return UserSchema;
      },
    },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';
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
  ],
  controllers: [UsersController],
  providers: [UsersService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class UsersModule {}

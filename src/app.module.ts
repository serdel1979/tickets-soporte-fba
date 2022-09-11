import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { WsGateway } from './ws/ws.gateway';
import { WsService } from './ws/ws.service';
import { WsModule } from './ws/ws.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    UsersModule,
    AuthModule,
    SolicitudesModule,
    WsModule,
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService, WsGateway, WsService],
})
export class AppModule { }

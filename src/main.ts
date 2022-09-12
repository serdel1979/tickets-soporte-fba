import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http.exceptions';
import { TomeOutInterceptor } from './common/interceptors/timeout.interceptors';
import { RolesGuard } from './common/role/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TomeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Tickets')
    .setDescription('Api para el manejo de tickets')
    .setVersion('1.0')
    .addTag('ticket')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen( process.env.PORT );
}
bootstrap();

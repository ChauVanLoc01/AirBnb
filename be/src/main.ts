import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationPipe, HttpStatus } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorValidate } from './types/ErrorValidate.type';
import { ValidationError } from 'class-validator';
import { ApiResponse } from './types/ApiResponse.type';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('Airbnb Api')
    .setDescription('The api for airbnb')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory(errors: ValidationError[]) {
        const messages = errors.map((err) => {
          return {
            key: err.property,
            errors: err.constraints,
          } as ErrorValidate;
        });
        throw new HttpException(
          {
            message: 'Input of user invalid!',
            data: messages,
          } as ApiResponse<ErrorValidate[]>,
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  await app.listen(process.env.PORT_APP || 1234);
}
bootstrap();

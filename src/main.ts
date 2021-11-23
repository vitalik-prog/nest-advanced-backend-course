import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('Advanced backend course')
    .setDescription('Rest API documentation')
    .setVersion('1.0.0')
    .addTag('Ulbi TV')
    .build();

  const documentation = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api/docs', app, documentation);

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () =>
    console.log(`Server has been started on ${PORT}`),
  );
}

start();

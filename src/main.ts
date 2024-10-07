import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Seeder } from './seeders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seeder = app.get(Seeder);
  await seeder.seed();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription(
      'API para gestionar libros, autores y géneros de la biblioteca',
    )
    .setVersion('1.0')
    .addTag('Books')
    .addTag('Authors')
    .addTag('Genres')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();

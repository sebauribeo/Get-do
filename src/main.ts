import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  const options = new DocumentBuilder()
  .setTitle('Pets example')
  .setDescription('The Pets API description')
  .setVersion('1.0')
  .addTag('Pets')
  .build();

const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();

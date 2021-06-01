import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const logger = new Logger();

  const options = new DocumentBuilder()
  .setTitle('Pets example')
  .setDescription('The Pets API description')
  .setVersion('1.0')
  .build()

const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api', app, document);
  await app.listen(port);
  logger.log(`Server Start Port ${port}`);
  app.useGlobalFilters(new AllExceptionsFilter);
}
bootstrap();

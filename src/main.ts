import * as dotenv from 'dotenv';
dotenv.config();
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const logger = new Logger();
  const { httpAdapter } = app.get(HttpAdapterHost);


  const options = new DocumentBuilder()
  .setTitle('Pets example')
  .setDescription('The Pets API description')
  .setVersion('1.0')
  .build()

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
app.useGlobalPipes(new ValidationPipe) 
await app.listen(port);

logger.log(`Server Start Port ${port}`);
}
bootstrap();

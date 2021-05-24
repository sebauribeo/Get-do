import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './services/logger/logger.service';
import { RedisService } from './services/redis/redis.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RedisService, LoggerService],
})
export class AppModule {}

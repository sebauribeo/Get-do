import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { RedisService } from './redis/redis.service';


@Module({
  imports: [ ConfigModule],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}

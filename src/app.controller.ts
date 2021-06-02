import { Controller, Get, HttpStatus, Param, ParseIntPipe, Response } from "@nestjs/common";
import { LoggerService } from "./services/logger/logger.service";
import { RedisService } from "./services/redis/redis.service";

@Controller()
export class AppController {
  constructor(
    private redisService: RedisService,
    private loggerService: LoggerService,
  ) {}

  @Get(':Pets')
  async getDataRedis(@Param('Pets', ParseIntPipe) Pets: number, @Response() response){
    const dataRedis: any = await this.redisService.getDataRedis(Pets, response);
      this.loggerService.customInfo({}, { 'Data obtained from Redis Cache!': dataRedis})
      return response.status(HttpStatus.OK).json(dataRedis);
  };
};
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
    const dataRedis: any = await this.redisService.getDataRedis(Pets);

    if (dataRedis === null){
      this.loggerService.customError({}, {message: 'Data Not Found!'});
      return response.status(HttpStatus.NOT_FOUND).json(`${response.statusCode} - Data Not Found: Key => ${Pets} `);
    } else {
      this.loggerService.customInfo({}, { message: 'Data obtained'})
        return response.status(HttpStatus.OK).json(dataRedis);
    };
  };
};
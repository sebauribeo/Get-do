import { Controller, Get, HttpStatus, Param, ParseIntPipe, Response } from "@nestjs/common";
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(private readonly _redisService: RedisService) {}

  @Get(':idKey')
  async getRedis(@Param('idKey', ParseIntPipe) idKey: number, @Response() response){
    const dataRedis: any = await this._redisService.getRedis(idKey);

    if (dataRedis === null){
      return response.status(HttpStatus.NOT_FOUND).json(`${response.statusCode} - Data Not Found: Key => ${idKey} `);
    } else {
        return response.status(HttpStatus.OK).json(dataRedis);
    }
  }
}
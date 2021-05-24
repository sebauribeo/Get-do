import { Controller, Get, HttpStatus, Param, ParseIntPipe, Response } from "@nestjs/common";
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(private redisService: RedisService) {}

  @Get(':Pets')
  async getDataRedis(@Param('Pets', ParseIntPipe) Pets: number, @Response() response){
    const dataRedis: any = await this.redisService.getDataRedis(Pets);

    if (dataRedis === null){
      return response.status(HttpStatus.NOT_FOUND).json(`${response.statusCode} - Data Not Found: Key => ${Pets} `);
    } else {
        return response.status(HttpStatus.OK).json(dataRedis);
    }
  }
}
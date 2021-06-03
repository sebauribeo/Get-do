import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Response } from "@nestjs/common";
import { validate } from "class-validator";
import { ValidationDTO } from "./dto/validation.dto";
import { LoggerService } from "./services/logger/logger.service";
import { RedisService } from "./services/redis/redis.service";

@Controller()
export class AppController {
  constructor(
    private redisService: RedisService,
    private loggerService: LoggerService,
  ) {}

  @Get(':Pets')
  async getDataRedis(@Param('Pets', ParseIntPipe) Pets: number){
    
    try {
      const dataRedis: any = await this.redisService.getDataRedis(Pets);
      const validationResult: ValidationDTO = JSON.parse(dataRedis); 
      const result = new ValidationDTO(validationResult);
      const validation = await validate(result);

      if (validation.length === 0) {
        this.loggerService.customInfo({}, { 'Data from Redis Cache!': JSON.parse(dataRedis)})
        this.loggerService.customInfo({}, { message: 'Data Validated is OK...!'})
        return JSON.parse(dataRedis);
      } else {
        this.loggerService.customError(null, validation);
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          statusMessage: 'Data not found!...'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        statusMessage: 'INTERNAL SERVER ERROR'
      }, HttpStatus.INTERNAL_SERVER_ERROR); 
    };
  };
};
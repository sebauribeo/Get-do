import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
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
  @HttpCode(HttpStatus.OK)
  async getDataRedis(@Param('Pets', ParseIntPipe) Pets: number){
    
    try {
      const dataRedis: any = await this.redisService.getDataRedis(Pets);
      const validationResult: ValidationDTO = JSON.parse(dataRedis); 
      const result = new ValidationDTO(validationResult);
      const validation = await validate(result);

      if (!validation) {
        this.loggerService.error(null, validation);
        throw new HttpException({
          status: HttpStatus.BAD_GATEWAY,
      }, HttpStatus.BAD_GATEWAY);
    } else {
        this.loggerService.info({}, {message: 'Data Validated is OK!...'})
        return JSON.parse(dataRedis);
      }
    } catch (error) {
        throw new HttpException({
          status: HttpStatus.BAD_GATEWAY,
          statusMessage: 'Data is not valid!...'
      }, HttpStatus.BAD_GATEWAY)
    };
  };
};
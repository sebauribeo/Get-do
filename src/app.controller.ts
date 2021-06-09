import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { validate } from "class-validator";
import { ValidationDTO } from "./dto/validation.dto";
import { LoggerService } from "./services/logger/logger.service";
import { RedisService } from "./services/redis/redis.service";

@Controller()
export class AppController {
  constructor(
    private redisService: RedisService,
    private logger: LoggerService,
  ) {}

  @Get(':Pets')
  async getDataRedis(@Param('Pets', ParseIntPipe) Pets: number){
    
    try {
      const dataRedis: any = await this.redisService.getDataRedis(Pets);
      const validationResult: ValidationDTO = JSON.parse(dataRedis); 
      const result = new ValidationDTO(validationResult);
      const validation = await validate(result);

      if (!validation) {
        this.logger.error(null, validation);
        throw new HttpException({
          statusMessage: 'Validate data error!...'
      }, HttpStatus.BAD_GATEWAY);
    } else {
        this.logger.info({}, {message: 'Data Validated is OK!...'})
        return JSON.parse(dataRedis);
      }
    } catch (error) {
        throw new HttpException({
          status: HttpStatus.BAD_GATEWAY,
          statusMessage: 'Data does not exist!...',
      }, HttpStatus.BAD_GATEWAY)
    };  };
};
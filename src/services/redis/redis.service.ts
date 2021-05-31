import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { ValidationDTO } from 'src/dto/validation.dto';
import { LoggerService } from '../logger/logger.service';


const asyncRedis = require("async-redis");
const redisClient = asyncRedis.createClient();

redisClient.on("error", function(error: string){
    console.log("Error" + error);
})

@Injectable()
export class RedisService {
    constructor( private readonly loggerService: LoggerService){}

    async getDataRedis(key: any){
        const dataRedis: any = await redisClient.get(key);
        this.loggerService.customInfo({}, { 'Data from the server': dataRedis });
        const validationResult: ValidationDTO = dataRedis; 
        const result = new ValidationDTO(validationResult);
        const validation = await validate(result);
        if (key !== null){
            this.loggerService.customInfo({}, { 'Data obtained from Redis Cache!': dataRedis})
            return JSON.parse(dataRedis);
        } else {
            this.loggerService.customError({}, {message: 'Data Not Found!'});
            this.loggerService.customError(null, validation);
            return (Error)
        };
    };
};
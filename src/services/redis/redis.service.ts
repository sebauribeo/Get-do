import { HttpException, HttpStatus, Injectable, Response } from '@nestjs/common';
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
    constructor(
        private readonly loggerService: LoggerService
    ){}

    async getDataRedis(key: any, @Response() response){
        const dataRedis: any = await redisClient.get(key);
        this.loggerService.customInfo({}, { 'Data from the server...': JSON.parse(dataRedis)});
        const validationResult: ValidationDTO = dataRedis; 
        const result = new ValidationDTO(validationResult);
        const validation = await validate(result);
        if (dataRedis !== null){
            this.loggerService.customInfo({}, {message: 'Data Obtained...'})
            return response.status(HttpStatus.OK),JSON.parse(dataRedis);
        } else {
            this.loggerService.customError(null, validation);
            this.loggerService.customError({}, {message: 'Data Not Found!...'});
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                statusMessage: 'INTERNAL SERVER ERROR'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
};
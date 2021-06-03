import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    async getDataRedis(key: any){
        const dataRedis: any = await redisClient.get(key);
        if (!dataRedis){
            this.loggerService.customError({}, {message: 'Data Not Found!...'});
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                statusMessage: 'INTERNAL SERVER ERROR'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            this.loggerService.customInfo({}, {message: 'Data Obtained...'})
            return (dataRedis);
        };
    };
};
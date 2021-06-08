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
            this.loggerService.error({}, {message: 'Data Not Found!...'});
            throw new HttpException({
                status: HttpStatus.BAD_GATEWAY,
            }, HttpStatus.BAD_GATEWAY);
        } else {
            this.loggerService.info({}, {'Data from Redis Cache!...': JSON.parse(dataRedis)})
            return (dataRedis);
        };
    };
};
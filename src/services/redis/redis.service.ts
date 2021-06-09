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
        private readonly logger: LoggerService
    ){}

    async getDataRedis(key: any){

        const dataRedis: any = await redisClient.get(key);
        if (!dataRedis){
            this.logger.error({}, {message: 'Data Not Found!...'});
            throw new HttpException({
                statusMessage: 'Data not found (redis)'
            }, HttpStatus.BAD_GATEWAY);
        } else {
            this.logger.info({}, {message: 'Data Obtained from Redis cache...'})
            return (dataRedis);
        };

    };
};
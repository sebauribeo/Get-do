import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';


const asyncRedis = require("async-redis");
const redisClient = asyncRedis.createClient();

redisClient.on("error", function(error: string){
    console.log("Error" + error);
})

@Injectable()
export class RedisService {
    constructor(private readonly loggerService: LoggerService){}
    async getDataRedis(key: any){
        const dataRedis: any = await redisClient.get(key);
        if (key === null) {
            this.loggerService.customError({}, {message: 'Data Error!'});
            return (Error)
        }else {
            this.loggerService.customInfo({}, {message: 'Data Obtained From Redis Cache!', id: key});
            return JSON.parse(dataRedis);
        }
    }
};
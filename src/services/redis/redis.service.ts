import { Injectable } from '@nestjs/common';

const asyncRedis = require("async-redis");
const redisClient = asyncRedis.createClient();

redisClient.on("error", function(error: string){
    console.log("Error" + error);
})

@Injectable()
export class RedisService {
    async getDataRedis(key: any){
        const dataRedis: string = await redisClient.get(key);
        return JSON.parse(dataRedis);
    };
};
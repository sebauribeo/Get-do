import { Injectable } from '@nestjs/common';

const asyncRedis = require("async-redis");
const redisClient = asyncRedis.createClient();

redisClient.on("error", function(error){
    console.log("CONECTION-REDIS-ERROR" + error);
})

@Injectable()
export class RedisService {
    async getRedis(idKey: number){
        const dataRedis: string = await redisClient.get(idKey);
        return JSON.parse(dataRedis);
    };
};
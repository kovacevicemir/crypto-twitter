const redis = require('redis');

// Set up redis
const redisClient = redis.createClient();
// const redisClient = redis.createClient({host: 'redis', port: 6379});
async function checkRedis(redisKey) {
    try {
        const data = new Promise((res, rej) => {
            redisClient.get(redisKey, (err, result) => {
                if(err) {
                    return rej(err);
                }
                res(result);
            })
        });
        return data;
    } catch (e) {
        throw new Error(`Redis Error`)
    }
}


const storeIntoRedis = (redisKey, responseJSON) => {
    redisClient.setex(redisKey, 3600, JSON.stringify({ source: 'Redis Cache', responseJSON}));
}

module.exports = {checkRedis, storeIntoRedis};

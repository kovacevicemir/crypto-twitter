const redis = require('redis');

// Set up redis
const redisClient = redis.createClient();

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

const storeDataIntoRedis = (redisKey, responseJSON) => {
    redisClient.setex(redisKey, 3600, JSON.stringify({ source: 'Redis Cache', responseJSON}));
}

module.exports = {checkRedis, storeDataIntoRedis};
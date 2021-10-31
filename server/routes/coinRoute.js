const express = require("express");
const router = express.Router();
const { getCoinRanking, getCoinPriceHistory } = require("../apis/coinApi")

// Environmental variable
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname+'/../.env')});

// Persistence utils
const { checkRedis, storeIntoRedis } = require('../persistence/redis-utils');
const { createBucket, checkS3, storeIntoS3 } = require('../persistence/s3-utils') 
const axios = require('axios');

router.get("/topCoins/:num", (req, res) => {
    try {
        const numCoins = req.params.num;
        getCoinRanking(numCoins)
            .then((data) => {
                topCoins = [];
                data.coins.forEach(coin => {
                    topCoins.push({
                        uuid: coin.uuid,
                        name: coin.name,
                        symbol: coin.symbol,
                        iconUrl: coin.iconUrl,
                        marketCap: coin.marketCap,
                        price: coin.price
                    })
                });
                return res.status(200).json(topCoins)
            })
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message, error_origin: err.stack })
    }
})

router.get("/coinPrice/:uuid", (req,res) => {
    try {

        // Param
        const uuid = req.params.uuid;

        // Persistence keys
        const key = uuid;
        const s3Key = `price-${key}`;
        const redisKey = `price:${key}`
        const bucketName = 'n10014926';

        // Create bucket
        createBucket(bucketName)
        
        checkRedis(redisKey).then((redisData) => {
            //  Found in cache
            if(redisData) {
                // Serve from cache
                const redisResponse = JSON.parse(redisData);
                return res.status(200).json(redisResponse);
            } else {
                // Not found in Cache
                // Check S3
                checkS3(bucketName, s3Key)
                    .then((bucketData) => {
                        // Serve from S3
                        const s3Response = JSON.parse(bucketData);
                        // Store into redis
                        storeIntoRedis(redisKey, s3Response.responseJSON);
                        return res.status(200).json(s3Response);
                    }).catch((err) => {
                        // Not found in S3
                        if(err.message == 'NoSuchKey' || err.message == 'NoSuchBucket') {
                            //  Serve from CoinrankingAPI
                            return getCoinPriceHistory(uuid)
                                .then((data) => {
                                    const responseJSON = data;
                                    storeIntoS3(bucketName, s3Key, responseJSON);
                                    storeIntoRedis(redisKey, responseJSON)
                                    return res.status(200).json({ source: 'TwitterAPI', responseJSON });
                                }).catch((err) => {
                                    return res.status(400).json({ success: false, error: err.message, error_origin: err.stack})
                                })
                            } else {
                            // Expired token
                            if(err.message == 'ExpiredToken') {
                                return res.status(400).json({ success: false, error: "Please check ~/aws/credentials file for token."})
                            } else {
                            // Unhandled errors, implement later
                            return res.status(400).json({ success:false, error: err.message })
                            }
                        } 
                    }) // End catch checkS3
            } // End if-else Check redis   
        }) // End .then checkRedis
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;
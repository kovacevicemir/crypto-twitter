const express = require("express");
const router = express.Router();
const { getTweet } = require('../apis/twitterApi')
const { getSentiment } = require('../apis/nlpApi')

// Environmental variable
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname+'/../.env')});

// Persistence utils
const { checkRedis, storeIntoRedis } = require('../persistence/redis-utils');
const { createBucket, checkS3, storeIntoS3 } = require('../persistence/s3-utils') 
const axios = require('axios');

const persistenceUse = (fetchFunc, bucketName, s3Key, redisKey) => {
    
}
router.get("/tweet", (req, res) => {
    try {

        const topic = req.query.topic;
        const numTweets = req.query.nums;
        const sentiments = [];
        const tweets = [];
        // Persistence keys
        const key = topic
        const s3Key = `tweet-${key}`;
        const redisKey = `tweet:${key}`
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
                            //  Serve from twitterAPI
                            return getTweet(topic, numTweets)
                                    .then((data) => {
                                        data.forEach((tweet) => {
                                            sentiments.push(getSentiment(tweet.tweet))
                                            tweets.push(tweet)
                                        })
                                        return {sentiments, tweets}
                                    }).then((data) => {
                                        Promise.all(data.sentiments)
                                            .then((val) => {
                                                // Store into S3 and redis
                                                const averageSentiment = val.reduce((prev, curr) => prev + curr, 0) / val.length
                                                const responseJSON = {"tweets": data.tweets, "avergaeSentiment": averageSentiment};
                                                storeIntoS3(bucketName, s3Key, responseJSON);
                                                storeIntoRedis(redisKey, responseJSON)
                                                return res.status(200).json({ source: 'TwitterAPI', responseJSON });
                                            }).catch((err) => {
                                                return res.status(400).json({ success: false, error: err.message, error_origin: err.stack})
                                            })
                                    }).catch((err) => {
                                        return res.status(400).json({ sucess: false, error: err.message, error_origin: err.stack})
                                    })

                        } else {
                            // Expired token
                            if(err.message == 'ExpiredToken') {
                            return res.status(400).json({ success: false, error: "Please check ~/aws/credentials file for token."})
                            }else {
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
var express = require("express");
var router = express.Router();

const path = require('path')
require('dotenv').config({path: path.resolve(__dirname+'/../.env')});

/* GET test */
router.get("/", async (req, res) => {
  try {
    res.status(200).json("This is some data from backend /test");
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

/* Persistence test */
const { checkRedis, storeIntoRedis } = require('../persistence/redis-utils');
const { createBucket, checkS3, storeIntoS3 } = require('../persistence/s3-utils') 
const axios = require('axios');

// Test using Wikipedia API (i.e. search?key=Redis )
router.get("/persistence-test/search", (req, res) => {
  try {
    const key = (req.query.key).trim();
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${key}`;
    const s3Key = `wikipedia-${key}`;
    const redisKey = `wikipedia:${key}`
    const bucketName = 'n10014926';
    
    // Create bucket
    createBucket(bucketName);

    // Try the cache
    checkRedis(redisKey).then((data) => {
      // Found in cache
      if(data) {
        // Serve from cache
        const redisResponse = JSON.parse(data)
        return res.status(200).json(redisResponse);
      } else {
        // Not found in Cache
        // Check S3
        checkS3(bucketName, s3Key)
          .then((data) => {
          // Serve from S3
          const s3Response = JSON.parse(data);
          // Store into redis
          storeIntoRedis(redisKey, s3Response.responseJSON)
          return res.status(200).json(s3Response);
        }).catch((err) => {

          // Not found in S3
          if(err.message == 'NoSuchKey' || err.message == 'NoSuchBucket') {
            //  Serve from Wikipedia API
            return axios.get(searchUrl)
              .then((response) => {
                const responseJSON = response.data;
                // Store into S3 and redis
                storeIntoS3(bucketName, s3Key, responseJSON);
                storeIntoRedis(redisKey, responseJSON)
                return res.status(200).json({ source: 'Wikipedia-Api', responseJSON})
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
        })
      }
    })
    
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message, error_origin: err.stack})
  }

})

module.exports = router;

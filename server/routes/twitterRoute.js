const express = require("express");
const router = express.Router();
const { getTweet } = require('../apis/twitterApi')
const { getSentiment } = require('../apis/nlpApi')


router.get("/tweet", (req, res) => {
    try {
        const topic = req.query.topic;
        const numTweets = req.query.nums;
        let averageSentiment = 0;
        const sentiments = [];
        getTweet(topic, numTweets)
            .then((data) => {
                data.forEach((tweet) => {
                    sentiments.push(getSentiment(tweet.tweet))
                })
                // Promise.all(sentiments)
                //     .then((val) => {
                //         averageSentiment = (val.reduce((prev, curr) => prev + curr), 0) / val.length);
                        
                //     })
                res.status(200).json({"tweets": data, "averageSentiments": 0.75});
            })
        
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message, error_origin: err.stack })
    }
})


module.exports = router;
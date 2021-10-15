const express = require("express");
const router = express.Router();
const { getTweet } = require('../apis/twitterApi')


router.get("/tweet", (req, res) => {
    try {
        const topic = req.query.topic;
        const numTweets = req.query.nums;
        
        getTweet(topic, numTweets)
            .then((data) => {
                res.status(200).json(data);
            })
        
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message, error_origin: err.stack })
    }
})


module.exports = router;
const express = require("express");
const router = express.Router();
const { getSentiment } = require('../apis/nlpApi')


router.get("/sentiment/:word", (req, res) => {
    try {
        const topic = req.params.word;
        
        getSentiment(topic)
            .then((data) => {
                return res.status(200).json(data);
            })
        
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message, error_origin: err.stack })
    }
})


module.exports = router;
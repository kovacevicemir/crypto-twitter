const express = require("express");
const router = express.Router();
const { getCoinRanking, getCoinPriceHistory } = require("../apis/coinApi")

router.get("/topCoins/:num", (req, res) => {
    try {
        const numCoins = req.params.num;
        getCoinRanking(numCoins)
            .then((data) => {
                topCoins = [];
                data.coins.forEach(coin => {
                    topCoins.push({
                        uuid: coin.uuid,
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
        const uuid = req.params.uuid;
        getCoinPriceHistory(uuid)
            .then((data) => {
                console.log(data)
                return res.status(200).json(data)
            } )
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message, error_origin: err.stack })
    }
})
module.exports = router;
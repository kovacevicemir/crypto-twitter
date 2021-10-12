const axios = require("axios");
const { connect } = require("../routes/test");

// API KEY
const API_KEY = 'coinranking02067dabb5e10fbcc313b7212c34c5772a3ed0a5c77da389';

// @GET top cryptocurrencies.
const getCoinRanking = async (number_of_coins) => {
  const options = {
    method: 'GET',
    url: `https://api.coinranking.com/v2/coins?orderBy=marketCap&limit=${number_of_coins}`,
    headers: {
      'x-access-token': API_KEY
    }
  };

  await axios(options)
    .then(data => {
      console.log(data.data.data)
    })
    .catch(err => 
      console.error(err)
      )
}

// @GET historical price of a cryptocurrency.
// NOTE: takes "UUID" of a coin as a parameter.
const getCoinPriceHistory = async (uuid) => {
  const options = {
    method: 'GET',
    url: `https://api.coinranking.com/v2/coin/${uuid}/history`,
    headers: {
      'x-access-token': API_KEY
    }
  };

  await axios(options)
    .then(data => {
      console.log(data.data.data)
    })
    .catch(err => 
      console.error(err)
    )
}

module.exports = {
  getCoinRanking,
  getCoinPriceHistory
}
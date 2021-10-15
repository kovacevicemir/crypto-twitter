const axios = require("axios");
const { connect } = require("../routes/test");

// API KEY
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname+'/../.env')});

const API_KEY = process.env.COIN_API_KEY

// @GET top cryptocurrencies.
const getCoinRanking = async (number_of_coins) => {
  const options = {
    method: 'GET',
    url: `https://api.coinranking.com/v2/coins?orderBy=marketCap&limit=${number_of_coins}`,
    headers: {
      'x-access-token': API_KEY
    }
  };

  return axios(options)
    .then(data => {
      return data.data.data
    })
    .catch(err => {
        return err
    })
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

  return axios(options)
    .then(data => {
      return data.data.data
    })
    .catch(err => {
      return err
    })
}

module.exports = {
  getCoinRanking,
  getCoinPriceHistory
}
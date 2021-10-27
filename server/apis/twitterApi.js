const axios = require("axios").default;
const Twitter = require('twitter-lite');

// TWITTER API KEYS
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname+'/../.env')});

const API_KEY = process.env.TWITTER_API_KEY
const API_KEY_SECRET = process.env.TWITTER_API_KEY_SECRET

// @GET tweets related to a keyword
const getTweet = async (keyword, number_of_tweets) => {
  const user = new Twitter({
    consumer_key: API_KEY,
    consumer_secret: API_KEY_SECRET,
  });

  try {
    let response = await user.getBearerToken();

    const app = new Twitter({
      bearer_token: response.access_token
    });

    response = await app.get('/search/tweets', {
      q: keyword,
      lang: "en",
      count: number_of_tweets,
    })

    const tweets = []
    for (tweet of response.statuses) {
      tweets.push({
        tweet: tweet.text,
        date: tweet.created_at
      })
    }
    
    return tweets
  } catch (err) {
    return console.error(err)
  }
}
  
module.exports = {
  getTweet
};
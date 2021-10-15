const axios = require("axios").default;
const Twitter = require('twitter-lite');

// TWITTER API KEYS
const API_KEY = 'diZ80LoUsyVuap0eUrNffOMSm';
const API_KEY_SECRET = 'deDnVcZI2U8fK66hUKPMe3z9VlGOvq5UHTyjiGaICEilW0aiuN';
const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAMFWUgEAAAAACduy2gLNP1dkRAmuThJhHaiC0DA%3D5wYK67Msnv7vSR5OJrwKoV6U9baWAgyvu92UaisfCuvf1SHZvD';
const ACCESS_TOKEN ='1437353763493199875-ShZvD6dwWkrCgT1KkS1nJmQ4xDufQL';
const ACESS_TOKEN_SECRET = 'j1XtrqYIqsmTPNEpfOFnZZZK4IkONBlOvNk0nKmkiOdRk';

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

    for (tweet of response.statuses) {
      console.dir(tweet.text);
    }
  } catch (err) {
    return console.error(err)
  }
}
  
module.exports = {
  getTweet
};
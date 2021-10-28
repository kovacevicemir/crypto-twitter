import {
  TEST_COMMUNICATION,
  GET_COIN_PRICE_HISTORY,
  GET_COIN_RANKING,
  GET_TWEET
} from "../actionTypes";
import axios from "axios";

const port = 5000;

// ACTION Example:
// 1st step
// Call some api or talk with backend
// 2nd step
// Pass results to Reducer

export const testAction = () => {
  return async (dispatch) => {
    let result = await axios.get(`http://localhost:${port}/test`);
    dispatch({ type: TEST_COMMUNICATION, payload: result.data });
  };
};

export const getCoinRanking = (number_of_coins) => {
  return async (dispatch) => {
    let result = await axios.get(
      `http://localhost:${port}/coin/topCoins/${number_of_coins}`
    );
    dispatch({ type: GET_COIN_RANKING, payload: result.data });
  };
};

export const getCoinPriceHistory = (uuid) => {
  return async (dispatch) => {
    let result = await axios.get(
      `http://localhost:${port}/coin/coinPrice/${uuid}`
    );
    dispatch({ type: GET_COIN_PRICE_HISTORY, payload: result.data });
  };
};

export const getTweet = async (topic, nums) => {
  return async (dispatch) => {
    let result = await axios.get(
      `http://localhost:${port}/twitter/tweet?topic=${topic}&nums=${nums}`
    );

    console.log(result);

    dispatch({ type: GET_TWEET, payload: result.data });
  };
};

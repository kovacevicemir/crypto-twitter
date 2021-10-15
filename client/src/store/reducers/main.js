import { TEST_COMMUNICATION, GET_COIN_PRICE_HISTORY, GET_COIN_RANKING, GET_TWEET } from "../actionTypes";

//Default state (memory)
const initState = {
  data:null
};

//REDUCER
export const main = (state = initState, action) =>{
  switch (action.type) {
    case TEST_COMMUNICATION:
      return {
        data:action.payload
      };
    case GET_COIN_RANKING:
      return {
        ...state,
        coin_ranking:action.payload
      }
    case GET_COIN_PRICE_HISTORY:
      return {
        ...state,
        coin_price_history:action.payload
      }
    case GET_TWEET:
      return {
        ...state,
        tweets:action.payload
      }
    default:
      return state;
  }
};
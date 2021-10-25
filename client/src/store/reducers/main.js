import { TEST_COMMUNICATION, GET_COIN_PRICE_HISTORY, GET_COIN_RANKING, GET_TWEET } from "../actionTypes";

//Default state (memory)
const initState = {
  data:null,
  whateverApiUneedHere:[
    {
      name: 'Team A',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    },
    {
      name: 'Team B',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    },
    {
      name: 'Team C',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }
  ]
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
      // let currentData = action.payload;
      // currentData[0].data = apiResultTeamA...
      // currentData[1].data = apiResultTeamB...
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
import { TEST_COMMUNICATION } from "../actionTypes";

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
    //Example
    //case TWITTER_NEWS:
      // return{
      //   ...state,
      //   twitterNews: action.payload
      // }
    default:
      return state;
  }
};
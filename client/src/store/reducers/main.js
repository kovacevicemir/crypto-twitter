import { TEST_COMMUNICATION } from "../actionTypes";

const initState = {
  data:null
};

export const main = (state = initState, action) =>{
  switch (action.type) {
    case TEST_COMMUNICATION:
      return {
        data:action.payload
      };
    default:
      return state;
  }
};
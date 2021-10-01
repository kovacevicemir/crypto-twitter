import { TEST_COMMUNICATION } from "../actionTypes";
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

import { TEST_COMMUNICATION } from "../actionTypes";
import axios from "axios";
const port = 5000;

export const testAction = () => {
  return async (dispatch) => {
    let result = await axios.get(`http://localhost:${port}/test`);
    dispatch({ type: TEST_COMMUNICATION, payload: result.data });
  };
};

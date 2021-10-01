import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { testAction } from "../store/actions/main";

const TestComponent = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.data);

  const onTestButtonClick = async () => {
    await dispatch(dispatch(testAction));
  };

  return (
    <div>
      <button onClick={onTestButtonClick}>test backend connection</button>
      <br/>
      {storeData ? storeData : null}
    </div>
  );
};

export default TestComponent;

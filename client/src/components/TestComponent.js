import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { testAction } from "../store/actions/main";

const TestComponent = () => {
  const dispatch = useDispatch(); //Upload
  const storeData = useSelector((state) => state.data); //Download

  const onTestButtonClick = async () => {
    await dispatch(testAction());
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

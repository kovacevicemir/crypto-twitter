import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { testAction, getCoinRanking, getCoinPriceHistory, getTweet } from "../store/actions/main";

const TestComponent = () => {
  const dispatch = useDispatch(); //Upload
  const storeData = useSelector((state) => state.data); //Download

  const onTestButtonClick = async () => {
    await dispatch(testAction());
  };

  const testTop5Coins = async () => {
    await dispatch(getCoinRanking(5));
  };

  const testHistoryCoins = async () => {
    await dispatch(getCoinPriceHistory("Qwsogvtv82FCd"));
  };
  const getTweet = async () => {
    await dispatch(getTweet("bitcoin",10));
  };

  return (
    <div>
      <button onClick={onTestButtonClick}>test backend connection</button>
      <br />
      <button onClick={testTop5Coins}>top 5 coins -> react dev tool state</button>
      <br />
      <button onClick={testHistoryCoins}>coin history -> react dev tool state</button>
      <br />
      <button onClick={getTweet}>tweets -> react dev tool state</button>
      <br />
      {storeData ? storeData : null}
    </div>
  );
};

export default TestComponent;

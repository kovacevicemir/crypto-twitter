import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { getTweet, getCoinPriceHistory, getCoinRanking } from '../../../store/actions/main';


// ----------------------------------------------------------------------

const CHART_DATA = [
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
];

export default function AppWebsiteVisits() {
  const dispatch = useDispatch(); //Upload
  const storeData = useSelector((state) => state.coin_price_history); //Download

  //create state for chart data
  const [chartData, setChartData] = useState([
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
]);

const accessTweet = async () => {
  return getTweet("bitcoin", 10)
    .then(data => {
      dispatch(data)
    })
};

const testHistoryCoins = async () => {
  await dispatch(getCoinPriceHistory("Qwsogvtv82FCd"));
};

//get data on component render
  useEffect(() => {
    testHistoryCoins()
    getCoinRanking(4)
  }, [])

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2021',
      '02/01/2021',
      '03/01/2021',
      '04/01/2021',
      '05/01/2021',
      '06/01/2021',
      '07/01/2021',
      '08/01/2021',
      '09/01/2021',
      '10/01/2021',
      '11/01/2021'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} price`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Coin Price" subheader={"Coin price history 2021"} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={storeData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

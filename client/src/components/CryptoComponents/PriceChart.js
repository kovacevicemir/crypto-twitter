import Chart from 'react-apexcharts';
import useFetch from '../useFetch';


const PriceChart = (coin) => {
    let {items, isLoading, error} = useFetch(`/coin/coinPrice/${coin.symbol}`)

    let series = [{
        data: []
    }]

    if(error) {
        console.error(error);
    }
    if(!isLoading) {
        items.responseJSON.history.forEach(item => {
            series[0].data.push({x: new Date(item.timestamp), "y": item.price});
        });
    }

    const chartOption = {
    title: {
        text: `Historical Price of ${coin.name}`,
        align: 'left'
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            title: {
                text: 'USD($)'
            },
            tooltip: {
            enabled: true
            }
        }
    };

    if(coin.symbol) {
        return (
        <Chart options={chartOption} series={series} width="1200" type="line" height="600" />
    )
    }
    else {
        return null;
    }

    
}

export default PriceChart;
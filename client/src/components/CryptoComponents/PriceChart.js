import Chart from 'react-apexcharts';
import useFetch from '../useFetch';

// A component for historical price chart of a cryptocurrecny in the past 24 hours.
const PriceChart = (coin) => {
    let {items, isLoading, error} = useFetch(`/coin/coinPrice/${coin.symbol}`)

    let series = [{
        data: []
    }]

    // Error handling of fetching from coinPrice API.
    if(error) {
        console.error(error)
        return (
            <div>
                <h2>Error detected while loading price chart for ${coin.symbol}</h2>
                <h2>Please refer to console</h2>
            </div>
        )
    }
    // Data loaded without error
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
    )}
    else {
        return null;
    }

    
}

export default PriceChart;
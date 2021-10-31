import useFetch from '../useFetch';
import {Bar} from 'react-chartjs-2'

function BalanceSheet(stock) { 

    let { items, isLoading, error } = useFetch(`/stocks/balanceSheet/${stock.stock}`);

    let assets = {
        label: 'Assets',
        data: [],
        backgroundColor: '#22aa99'
    }

    let liabilities = {
        label: 'Liabilities',
        data: [],
        backgroundColor: '#994499'
    }

    let equity = {
        label: 'Equity',
        data: [],
        backgroundColor: '#316395'
    }

    let options = {
        responsive: true,
        scales: {
            xAxes: [{
                    stacked: true
                }],
            yAxes: [{
                stacked: true
            }]
            },
            plugins: {
                title: {
                    display: true,
                    tesxt: `Balance Sheet ${stock.stock}`
                }
            }
        }

    const data = {
        labels: [],
        datasets: []
    }

    if(error) {
        console.error(error)
    }

    let isLoaded = true;
    if(!isLoading) {
        items.forEach((item) => {
            data.labels.unshift(item.date);
            assets.data.unshift(item.totalAssets);
            liabilities.data.unshift(item.totalLiabilities);
            equity.data.unshift(item.totalStockholdersEquity);
        })
        
        data.datasets.push(assets, liabilities, equity)
        isLoaded = false;
        console.log(data)
    }

    return (
        <div>
            { isLoaded ? null :
            <Bar data={data} options={options}/>
            }
        </div>
    )
}

export default BalanceSheet;
import Chart from 'react-apexcharts';
import useFetch from '../useFetch';
import { Timeline } from 'react-twitter-widgets'
const SentimentChart = (props) => {
    let {items, isLoading, error} = useFetch(`/twitter/tweet?topic=${props.topic}&nums=${props.nums}`)

    let series = [0]

    const options =  {
        chart: {
            height: 500,
            type: "radialBar"
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "70%"
                }
            }
        },
        labels: [`Sentiment Positivity Percentage on ${props.topic}`]
    };
    
    if(error) {
        console.error(error);
    }
    if(!isLoading) {
        let sentimentVal = Math.floor(items.responseJSON.averageSentiment * 100)
        series[0] = [sentimentVal]
    }

    if(props) {
        return (
        <div>
            <Timeline
                dataSource={{
                    sourceType: 'profile',
                    screenName: `${props.topic}`
                }}
                options={{
                    height: '1000'
                }}
            />
            <Chart options={options} series={series} type="radialBar" height="600" />
        </div>
    )} else {
        return null;
    }
}
    
export default SentimentChart;
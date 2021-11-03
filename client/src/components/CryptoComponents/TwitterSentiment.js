import Chart from 'react-apexcharts';
import useFetch from '../useFetch';
import { Timeline } from 'react-twitter-widgets'

// A component for Twitter Sentiment Analysis chart AND
// A tweeter timeline listing tweets regarding a cryptocurrency
const TwitterSentiment = (props) => {
    let {items, isLoading, error} = useFetch(`/twitter/tweet?topic=${props.topic}&nums=${props.tweetNums}`)

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
    
    // Error handling for twitter sentiment anaylsis API
    if(error) {
        console.error(error)
        return (
            <div>
                <h2>Error detected while loading tweeter anaylsis on ${props.topic}</h2>
                <h2>Please refer to console.</h2>
            </div>
        )
    }
    // Data loaded without error.
    if(!isLoading) {
        let sentimentVal = Math.floor(items.responseJSON.averageSentiment * 100)
        series[0] = [sentimentVal]
    }

    if(props) {
        return (
        <div>
            <Chart options={options} series={series} type="radialBar" height="500" width="500" />
            <Timeline
                dataSource={{
                    sourceType: 'profile',
                    screenName: `${props.topic.split(" ")[0]}` // Twitter only accepts one word (i.e. 'binance coin X -> binanace O)
                }}
                options={{
                    height: '1000',
                    width: '1000'
                }}
            />
        </div>
    )} else {
        return null;
    }
}
    
export default TwitterSentiment;
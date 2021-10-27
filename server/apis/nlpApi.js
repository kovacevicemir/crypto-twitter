const { SentimentAnalyzer } = require('node-nlp')

// Sentiment analysis tool, sentiment of a 'text' is described as float
function getSentiment(text) {
    try {
        const sentiment = new SentimentAnalyzer({ language: 'en' });
        return sentiment
            .getSentiment(text)
            .then(result => {
                return result.score;
            })
            .catch(err => {
                return err
            })
    } catch (err) {
        return err;
    }

    
}


module.exports = { getSentiment }   
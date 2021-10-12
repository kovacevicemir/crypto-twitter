const language = require('@google-cloud/language');
const languageClient = new language.LanguageServiceClient();

// Sentiment analysis tool, sentiment of a 'text' is described as float
async function getSentiment(text) {
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    const [result] = await languageClient.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    return sentiment.score;
}

module.exports = { getSentiment }
const natural = require('natural');
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

function getSentiment(text) {
    const tokenizer = new natural.WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(text);
    return analyzer.getSentiment(tokenizedReview);
}

module.exports = { getSentiment };

const axios = require('axios');
const API_KEY = process.env.NYTIMES_API_KEY;

exports.handler = async function(event, context) {
    const articleId = event.queryStringParameters.articleId;

    if (!articleId) {
        return {
            statusCode: 400,
            body: 'Article ID is required'
        };
    }

    try {
        const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${API_KEY}`);
        const article = response.data.results.find(article => article.id === parseInt(articleId));

        if (!article) {
            return {
                statusCode: 404,
                body: 'Article not found'
            };
        }

        return {
            statusCode: 303,
            headers: {
                Location: article.url
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        };
    }
}

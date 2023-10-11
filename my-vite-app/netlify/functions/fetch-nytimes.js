const API_KEY = process.env.NYTIMES_API_KEY;

const axios = require('axios');

exports.handler = async function(event, context) {
  console.log(API_KEY)
  try {
    const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${API_KEY}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' })
    };
  }
}

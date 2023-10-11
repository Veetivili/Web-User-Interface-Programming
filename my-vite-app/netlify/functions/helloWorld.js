exports.handler = async function(event, context) {

  const data = { message: 'world!' };

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
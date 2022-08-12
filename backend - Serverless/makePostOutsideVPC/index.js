// This lambda is attached to the '/makepost' endpoint. This method invokes the makePost lambda, and then sends a text message with the new post id
// The reason for this is because this lambda needs to be outside of the VPC in order to send the message, but the other lambda needs to be inside it in order to access the database

const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

const twilio = require('twilio');
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendMessage(message) {
  return await twilioClient.messages.create({
    from: "+" + process.env.TWILIO_NUMBER,
    to: "+12678380953",
    body: message,
  });
}

exports.handler = async (event, context, callback) => {
    
    const params = {
      FunctionName: 'arn:aws:lambda:us-east-2:313267782585:function:makePost',
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify(event),
    };
    
    const response = await lambda.invoke(params).promise();
    if(response.StatusCode !== 200){
      throw new Error('Failed to get response from lambda function')
    }
    
    const payload = JSON.parse(response.Payload);
    const postInfo = JSON.parse(payload.body);
    const textMessage = ' \n\n' + postInfo.title + '\n\n' + "ID: " + postInfo.postId + '\n\n' + postInfo.url;

    try {
        const message = await sendMessage(textMessage);
    } catch (error) {
        console.log('error', error);
    }
    
    const returnVal = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        isBase64Encoded: false,
        body: JSON.stringify({ status: 200, postInfo })
    }
      
    return returnVal;
};
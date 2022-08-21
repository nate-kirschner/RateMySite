// This lambda will be outside of the VPC to allow for SMS messaging

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

    let params;
    try {
        params = JSON.parse(event.body);
    } catch(err) {
        params = event.body;
    }

    const {postId, text, commentId} = params;

    const textMessage = ' \n\nComment Reported\n\n"' + text + '"\n\nPost ID: ' + postId + '\n\nComment ID: ' + commentId;


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
        body: JSON.stringify({ status: 200 })
    }
      
    return returnVal;
};
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const axios = require('axios');

async function veryifyCaptcha(body) {
    let eventBody;
    try {
      eventBody = JSON.parse(body);
    } catch(err) {
      eventBody = body;
    }
    
    if (!process.env.CAPTCHA_SECRET_KEY || !eventBody.captchaToken) {
      return false;
    }
    const captchaResp = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${eventBody.captchaToken}`
    );
    console.log(captchaResp)
    
    return captchaResp.data.success && captchaResp.status === 200;
}

exports.handler = async (event) => {
    
    // Verify captcha token
    const captcha = await veryifyCaptcha(event.body);
    if (!captcha) { //if not validated, return 400
      const returnVal = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        isBase64Encoded: false,
        body: JSON.stringify({ status: 400 })
      }
      return returnVal;
    }
    
    //Next, invoke updatePost lambda with event body
    const params = {
      FunctionName: 'arn:aws:lambda:us-east-2:313267782585:function:updatePost',
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: JSON.stringify(event),
    };
    
    const response = await lambda.invoke(params).promise();
    if(response.StatusCode !== 200){
      throw new Error('Failed to get response from lambda function')
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

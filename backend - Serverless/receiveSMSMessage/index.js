// This file needs to go outside of this folder

const mysql = require('mysql')

const database = "ratemysite"
const { receiveSMSMessage } = require('./lib/receiveSMSMessage.js');

exports.handler = async (event) => {
    
    const message = event.queryStringParameters.Body;
    
    let con = mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database,
        port: process.env.RDS_PORT,
    });
    
    con.connect(function(err) {
        if (err) throw err;
    });
    
    const result = await receiveSMSMessage(con, message);
    
    con.end();
    
    return result;
};
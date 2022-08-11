const mysql = require('mysql')

const database = "ratemysite"
// Change this line depending on which lambda this is in
const { makePost } = require("./lib/makePost.js");

exports.handler = async (event, context, callback) => {
    
    let params;
    try {
        params = JSON.parse(event.body);
    } catch(err) {
        params = event.body;
    }
    
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
    
    // Change this line depending on which lambda this is in
    const body = await makePost(con, params);
    
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        isBase64Encoded: false,
        body: JSON.stringify(body)
    }

    con.end();

    return response;
};
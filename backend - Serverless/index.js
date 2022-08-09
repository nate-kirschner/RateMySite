const mysql = require('mysql')

const database = "ratemysite"
const { username, password, host, port } = require("./lib/config.js");
const { makePost } = require("./lib/makePost.js");

exports.handler = async (event) => {
    
    const params = event.body;
    
    let con = mysql.createConnection({
        host,
        user: username,
        password,
        database,
        port,
    });
    
    con.connect(function(err) {
        if (err) throw err;
    });
    
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


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
    
    const response = await makePost(con, params);

    con.end();
    
    return response;
};


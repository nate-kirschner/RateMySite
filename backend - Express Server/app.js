const express = require("express");
const config = require("./config");
const cors = require("cors");
const mysql = require("mysql");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const controller = require('./controller');

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.setHeader(
      "Access-Contreol-Allow-Headers",
      "Content-type,Authorization"
    );
    next();
  });

  const db =  mysql.createConnection({
    host: config.mysql.host,
    port: config.mysql.port,
    password: config.mysql.password,
    user: config.mysql.user,
    database: config.mysql.database,
  });


  const port = config.port;
  app.listen(port, (err) => {
    if (err) {
      return err;
    }
    console.log(`Server started on port ${port}!`);
  });


  controller(db, app);
  
}

startServer();

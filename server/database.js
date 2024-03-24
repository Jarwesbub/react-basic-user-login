const mysql = require('mysql');

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  };

  let connection = mysql.createConnection(config);
  connection.connect(function (err) {
    if (err){
        console.error('Error while connecting: '+err.stack);
        return;
    }
    console.log('Connected to thread: '+connection.threadId);
  });

  module.exports = connection;
const mysql = require('mysql');

// connection to mysql
module.exports = () => {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });

  connection.connect((err) => {
    if (err) console.log(err);
    console.log('Connected to mysql!');
  });

  return connection;
};

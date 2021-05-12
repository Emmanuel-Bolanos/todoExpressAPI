const mysql = require('mysql2/promise');

// connection to mysql
module.exports = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });

  connection.connect((err) => {
    // TODO error handling
    if (err) console.log(err);
  });

  return connection;
};

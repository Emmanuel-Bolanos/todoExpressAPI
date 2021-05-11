const con = require('../helpers/dbConnection');

function getAll(cb) {
  const db = con();
  db.query('SELECT * FROM todolist', (err, results) => {
    // TODO error handling
    if (err) console.log(err);
    cb(results);
  });
}

module.exports = {
  getAll,
};

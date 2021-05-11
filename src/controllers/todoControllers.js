const { Todo } = require('../models');

const getAll = (req, res) => {
  Todo.getAll((todos) => {
    res.status(200).send(todos);
  });
};

module.exports = {
  getAll,
};

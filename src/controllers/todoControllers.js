const { TodoNote } = require('../models');

const getAll = async (req, res) => {
  try {
    const todos = await TodoNote.getAll();
    return res.status(200).send(todos);
  } catch (err) {
    return res.status(500).send({
      message: 'Internal Server Error: please try again later',
    });
  }
};

const createTodo = async (req, res) => {
  const data = req.body;

  try {
    const newToDo = new TodoNote(data);
    await newToDo.save();
    return res.status(201).send({
      message: 'New to-do created successfully',
      id: newToDo.getId(),
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal Server Error: please try again later',
    });
  }
};

const updateTodo = (req, res) => {
  res.status(200).send({
    message: 'update a todo',
  });
};

const deleteTodo = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const todos = await TodoNote.getAll();

    if (todos.find((todo) => todo.id === id)) {
      await TodoNote.delete(id);
      return res.status(200).send({
        message: `To-do note with id ${id} deleted`,
      });
    }

    return res.status(400).send({
      message: 'to-do does not exist!',
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal Server Error: please try again later',
    });
  }
};

module.exports = {
  getAll,
  createTodo,
  updateTodo,
  deleteTodo,
};

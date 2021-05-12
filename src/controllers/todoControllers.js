const { TodoNote } = require('../models');

const getAll = async (req, res) => {
  try {
    // get and send all todos
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
    // Create new todo
    const newToDo = new TodoNote(data);
    // Check if todo is duplicated on db
    if (await newToDo.isDuplicated()) {
      return res.status(409).send({
        message: 'duplicate to-dos are not allowed',
      });
    }
    // Save new todo in db
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
    // get all todos
    const todos = await TodoNote.getAll();
    // search for the id given by the user
    if (todos.find((todo) => todo.id === id)) {
      await TodoNote.delete(id);
      return res.status(200).send({
        message: `To-do note with id ${id} deleted`,
      });
    }
    // send a not found if the id is not on the db
    return res.status(404).send({
      message: 'to-do note not found!',
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

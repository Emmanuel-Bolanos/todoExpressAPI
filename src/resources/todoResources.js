const express = require('express');
const { todoValidation } = require('../validation');
const { todoControllers } = require('../controllers');

const todoResources = express.Router();

todoResources.get('/', todoControllers.getAll);
todoResources.get('/:id', todoControllers.getTodo);
todoResources.post('/', todoValidation.createTodo, todoControllers.createTodo);
todoResources.put('/:id', todoValidation.updateTodo, todoControllers.updateTodo);
todoResources.delete('/:id', todoControllers.deleteTodo);

module.exports = todoResources;

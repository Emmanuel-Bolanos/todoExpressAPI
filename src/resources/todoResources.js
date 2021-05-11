const express = require('express');
const { todoControllers } = require('../controllers');

const todoResources = express.Router();

todoResources.get('/', todoControllers.getAll);

module.exports = todoResources;

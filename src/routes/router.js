const express = require('express');
const { todoResources } = require('../resources');

const router = express.Router();

router.use('/todos', todoResources);

module.exports = router;

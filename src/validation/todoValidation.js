const { check, validationResult } = require('express-validator');

const createTodo = [
  check('title')
    .exists()
    .withMessage('title must exist')
    .bail()
    .notEmpty()
    .withMessage('title can not be empty')
    .bail()
    .isString()
    .withMessage('title must be a string'),
  check('content', 'content must be a string')
    .optional()
    .isString(),
  check('deadline', 'invalid date')
    .optional()
    .custom((datetime) => (String(new Date(datetime)) !== 'Invalid Date')),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }
    return next();
  },
];

module.exports = {
  createTodo,
};

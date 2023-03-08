const Joi = require('joi');
const { ValidationError } = require('../helpers/error');

const addBookValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    author: Joi.string().min(3).max(30).required()
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details), 401));
  }
  next();
};

module.exports = { addBookValidation };

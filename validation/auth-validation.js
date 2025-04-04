const Joi = require('joi');

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

const signupValidationSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).trim().required(),
  lastname: Joi.string().min(3).max(30).trim().required(),
  gender: Joi.string().valid('male', 'female', 'not-set').lowercase().trim(),
  username: Joi.string().min(3).max(40).lowercase().trim().required(),
  password: Joi.string().min(8).pattern(passwordRegex).required()
});

const loginValidationSchema = Joi.object({
  username: Joi.string().trim().lowercase().required(),
  password: Joi.string().required()
});

module.exports = { signupValidationSchema, loginValidationSchema };

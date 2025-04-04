const Joi = require('joi');

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

const editAccountValidationSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).trim(),
  lastname: Joi.string().min(3).max(30).trim(),
  username: Joi.string().min(3).max(40).lowercase().trim(),
  gender: Joi.string().valid('male', 'female', 'not-set').lowercase().trim()
});

const changePasswordValidationSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).pattern(passwordRegex).required()
});

module.exports = {
  editAccountValidationSchema,
  changePasswordValidationSchema
};

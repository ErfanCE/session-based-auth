const router = require('express').Router();
const { signup, login, logout } = require('../controllers/auth-controller');
const { asyncHandler } = require('../utils/async-handler');
const { validator } = require('../validation/validator');
const {
  signupValidationSchema,
  loginValidationSchema
} = require('../validation/auth-validation');

router.post('/signup', validator(signupValidationSchema), asyncHandler(signup));
router.post('/login', validator(loginValidationSchema), asyncHandler(login));
router.get('/logout', logout);

module.exports = router;

const router = require('express').Router();
const { protect } = require('../controllers/auth-controller');
const { asyncHandler } = require('../utils/async-handler');
const { validator } = require('../validation/validator');
const {
  changePassword,
  getUserAccount,
  editUserAccount,
  deleteUserAccount,
  uploadUserAvatar
} = require('../controllers/account-controller');
const {
  editAccountValidationSchema,
  changePasswordValidationSchema
} = require('../validation/account-validation');

router.get('/', asyncHandler(protect), asyncHandler(getUserAccount));

router.patch(
  '/',
  asyncHandler(protect),
  uploadUserAvatar,
  validator(editAccountValidationSchema),
  asyncHandler(editUserAccount)
);

router.delete('/', asyncHandler(protect), asyncHandler(deleteUserAccount));

router.put(
  '/change-password',
  asyncHandler(protect),
  validator(changePasswordValidationSchema),
  asyncHandler(changePassword)
);

module.exports = router;

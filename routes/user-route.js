const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/auth-controller');
const {
  addUser,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById
} = require('../controllers/user-controller');
const { asyncHandler } = require('../utils/async-handler');

// router.use(asyncHandler(protect), restrictTo('admin'));

router.get(
  '/',
  asyncHandler(protect),
  restrictTo('admin'),
  asyncHandler(getAllUsers)
);

router.post(
  '/',
  asyncHandler(protect),
  restrictTo('admin'),
  asyncHandler(addUser)
);

router.get(
  '/:userId',
  asyncHandler(protect),
  restrictTo('admin'),
  asyncHandler(getUserById)
);

router.patch(
  '/userId',
  asyncHandler(protect),
  restrictTo('admin'),
  asyncHandler(editUserById)
);

router.delete(
  '/',
  asyncHandler(protect),
  restrictTo('admin'),
  asyncHandler(deleteUserById)
);

module.exports = router;

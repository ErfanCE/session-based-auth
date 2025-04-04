const User = require('../models/user-model');
const { AppError } = require('../utils/app-error');

const getUserAccount = async (req, res, next) => {
  const { userId } = req.session;

  const user = await User.findById(userId, { __v: 0 });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
};

const editUserAccount = async (req, res, next) => {
  const { userId } = req.session;

  const {
    firstname = null,
    lastname = null,
    gender = null,
    username = null
  } = req.body;

  const user = await User.findById(userId);

  const duplicateUsername = await User.findOne({
    username,
    _id: { $ne: user._id }
  });
  if (!!duplicateUsername) {
    return next(
      new AppError(409, 'username is already exists, use a different username')
    );
  }

  user.firstname = firstname ?? user.firstname;
  user.lastname = lastname ?? user.lastname;
  user.username = username ?? user.username;
  user.gender = gender ?? user.gender;

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
};

const deleteUserAccount = async (req, res, next) => {
  const { userId } = req.session;

  await User.findByIdAndDelete(userId);

  req.session.destroy((err) => {
    if (!!err) return next(err);
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
};

const changePassword = async (req, res, next) => {
  const { userId } = req.session;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(userId).select('+password');

  const isCurrentPasswordMatch = await user.comparePasswords(currentPassword);
  if (!isCurrentPasswordMatch) {
    return next(new AppError(400, 'your current password is not match'));
  }

  user.password = newPassword;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
};

module.exports = {
  changePassword,
  getUserAccount,
  editUserAccount,
  deleteUserAccount
};

const User = require('../models/user-model');
const { AppError } = require('../utils/app-error');

const getAllUsers = async (req, res, next) => {
  const users = await User.find({}, { __v: 0 });

  res.status(200).json({
    status: 'success',
    data: { users }
  });
};

const addUser = async (req, res, next) => {
  const {
    firstname = null,
    lastname = null,
    gender = null,
    username = null,
    password = null,
    role = 'user'
  } = req.body;

  const duplicateUsername = await User.findOne({ username });
  if (!!duplicateUsername) {
    return next(
      new AppError(409, 'username is already exists, use a different username')
    );
  }

  const user = await User.create({
    firstname,
    lastname,
    username,
    password,
    gender,
    role
  });

  res.status(201).json({
    status: 'success',
    data: { user }
  });
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError(404, `user (id: ${userId}) not found`));
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
};

const editUserById = async (req, res, next) => {
  const { userId } = req.params;

  const {
    firstname = null,
    lastname = null,
    gender = null,
    username = null,
    role = 'user'
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
  user.role = role ?? user.role;

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
};

const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  await User.findByIdAndDelete(userId);

  if (!!req.session) {
    req.session.destroy((err) => {
      if (!!err) return next(err);
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById
};

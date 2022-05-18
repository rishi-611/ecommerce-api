const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const createUser = async (userData) => {
  if (await User.isUsernameTaken(userData.username)) {
    throw new ApiError(httpStatus.OK, `Username already taken`);
  }
  const user = await User.create(userData);
  return user;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

module.exports = {
  getUserById,
  createUser,
  getUserByUsername,
};

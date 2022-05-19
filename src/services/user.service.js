const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

//creates user in db
//required fields: {username, password, userType}
const createUser = async (userData) => {
  if (await User.isUsernameTaken(userData.username)) {
    throw new ApiError(httpStatus.OK, `Username already taken`);
  }
  const user = await User.create(userData);
  return user;
};

// login user if he provides correct {username, password}
const login = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect username or password"
    );

  const passMatches = await user.isPasswordMatch(password);
  if (!passMatches)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Incorrect username or password"
    );

  return user;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

//returns a list of all users whose usertype is seller
const getAllSellers = async () => {
  //find all users, whose userType is seller
  const sellers = await User.find({ userType: "seller" });
  return sellers;
};

const getSellerById = async (sellerId) => {
  const seller = await User.findOne({ _id: sellerId, userType: "seller" });
  return seller;
};

const getBuyerById = async (buyerId) => {
  const buyer = await User.findOne({ _id: buyerId, userType: "buyer" });
  return buyer;
};

module.exports = {
  createUser,
  login,
  getUserByUsername,
  getUserById,
  getAllSellers,
  getSellerById,
  getBuyerById,
};

const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");

const login = async (username, password) => {
  const user = await userService.getUserByUsername(username);
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

module.exports = {
  login,
};

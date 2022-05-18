const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService, tokenService } = require("../services");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateAuthToken(user);
  res.status(httpStatus.CREATED).send({ user, token });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await userService.login(username, password);
  const token = await tokenService.generateAuthToken(user);
  res.send({ user, token });
});

module.exports = {
  register,
  login,
};

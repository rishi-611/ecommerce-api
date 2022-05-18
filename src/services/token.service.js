const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    exp: expires,
    type,
  };
  const token = jwt.sign(payload, secret);
  return token;
};

const generateAuthToken = async (user) => {
  //token should expire after "accessExpirationMinutes"
  const expiresAt =
    Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

  const accessToken = generateToken(user._id, expiresAt, tokenTypes.ACCESS);

  return accessToken;
};

module.exports = {
  generateToken,
  generateAuthToken,
};

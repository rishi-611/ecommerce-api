const Joi = require("joi");
const { password } = require("./custom.validation");
import { USER_TYPES } from "../config/config";

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
    type: Joi.string()
      .required()
      .valid([...USER_TYPES]),
  }),
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().custom(password).required(),
  }),
};

module.exports = {
  register,
  login,
};

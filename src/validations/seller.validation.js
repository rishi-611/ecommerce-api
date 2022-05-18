const Joi = require("joi");

const items = {
  body: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required().min(0),
    })
  ),
};

module.exports = {
  items,
};

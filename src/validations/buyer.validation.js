const Joi = require("joi");
const { objectId } = require("./custom.validation");

const seller_id = {
  params: Joi.object().keys({
    seller_id: Joi.string().custom(objectId).required(),
  }),
};

const createOrder = {
  body: Joi.object().keys({
    items: Joi.array().items(Joi.string().custom(objectId)).required(),
  }),
};

module.exports = {
  seller_id,
  createOrder,
};

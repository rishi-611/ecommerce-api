const Joi = require("joi");
const { objectId } = require("./custom.validation");

const seller_id = {
  params: Joi.object().keys({
    seller_id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  seller_id,
};

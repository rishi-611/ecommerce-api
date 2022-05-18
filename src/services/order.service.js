const httpStatus = require("http-status");
const { Order } = require("../models");
const ApiError = require("../utils/ApiError");

const getOrdersBySellerId = async (seller_id) => {
  const orders = await Order.find({ seller: seller_id });
  return orders;
};

module.exports = { getOrdersBySellerId };

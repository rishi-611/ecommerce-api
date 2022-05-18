const httpStatus = require("http-status");
const { Order } = require("../models");
const ApiError = require("../utils/ApiError");

const getOrdersBySellerId = async (seller_id) => {
  const orders = await Order.find({ seller: seller_id });
  return orders;
};

//create order from a list of products,
//items array contains a list of product ids
const createOrder = async (items) => {};

module.exports = { getOrdersBySellerId };

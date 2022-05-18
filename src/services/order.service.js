const httpStatus = require("http-status");
const { Order } = require("../models");
const ApiError = require("../utils/ApiError");
const productService = require("./product.service");

const getOrdersBySellerId = async (seller_id) => {
  const orders = await Order.find({ seller: seller_id });
  return orders;
};

//create order from a list of products,
//items array contains a list of product ids
const createOrder = async (buyer, seller, items) => {
  const products = await Promise.all(
    items.map(async (item) => {
      const product = await productService.getProductById(item);

      //if an item is detected which is not sold by the seller, throw
      if (!product)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `seller does not provide item with id ${item}`
        );

      return product;
    })
  );

  const order = new Order({ buyer, seller, items });
  await order.save();
  return order;
};

module.exports = { createOrder, getOrdersBySellerId };

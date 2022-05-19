const httpStatus = require("http-status");
const { Order } = require("../models");
const ApiError = require("../utils/ApiError");
const productService = require("./product.service");
const catalogueService = require("./catalogue.service");
const { ObjectId } = require("mongodb");

const getOrdersBySellerId = async (seller_id) => {
  const orders = await Order.find({ seller: seller_id });
  return orders;
};

//create order from a list of products,
//items array contains a list of product ids
const createOrder = async (buyer, seller, items) => {
  //get catalogue of the user
  const catalogue = await catalogueService.getCatalogueBySellerId(seller);

  //check if all product ids in items array are ids of product supplied by the seller
  let invalidItem;
  const areItemsFromCatalogue = items.every((item) => {
    const isIncluded = catalogue.products.includes(ObjectId(item));
    if (!isIncluded) {
      invalidItem = item;
      return false;
    }

    return true;
  });

  if (areItemsFromCatalogue) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `item with id ${invalidItem} does not belong to this seller's catalogue`
    );
  }

  const order = new Order({ buyer, seller, items });
  await order.save();
  return order;
};

module.exports = { createOrder, getOrdersBySellerId };

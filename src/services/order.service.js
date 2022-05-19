const httpStatus = require("http-status");
const { Order } = require("../models");
const ApiError = require("../utils/ApiError");
const catalogueService = require("./catalogue.service");

const getOrdersBySellerId = async (seller_id) => {
  const orders = await Order.find({ seller: seller_id });
  return orders;
};

//create order from a list of products,
//items array contains a list of product ids
const createOrder = async (buyer, seller, items) => {
  //get catalogue of the user and convert object ids to strings
  let products = await catalogueService.getProductsInCatalogue(seller);
  products = products.map((product) => product.toString());

  //check if all product ids in items array are included in seller catalogue products
  let invalidItem;
  const areItemsFromCatalogue = items.every((item) => {
    const isIncluded = products.includes(item);

    if (!isIncluded) {
      invalidItem = item;
      return false;
    }
    return true;
  });

  //if an invalid item found, throw
  if (!areItemsFromCatalogue) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `item with id ${invalidItem} does not belong to this seller's catalogue`
    );
  }

  const order = new Order({ buyer, seller, products: items });

  //save order in db, send to client after populating products array
  await order.save();
  await order.populate("products");
  return order;
};

//returns all orders for a given seller
const getOrders = async (sellerId) => {
  const orders = await Order.find({ seller: sellerId })
    .populate("buyer")
    .populate("products")
    .exec();

  return orders;
};

module.exports = { createOrder, getOrdersBySellerId, getOrders };

const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService, catalogueService, orderService } = require("../services");
const ApiError = require("../utils/ApiError");

const getAllSellers = catchAsync(async (req, res) => {
  const sellers = await userService.getAllSellers();
  res.send(sellers);
});

const getCatalogue = catchAsync(async (req, res) => {
  const { seller_id } = req.params;
  const catalogue = await catalogueService.getCatalogueBySellerId(seller_id);

  res.send(catalogue);
});

const createOrder = catchAsync(async (req, res) => {
  const { buyer, seller, items } = req.body;

  const order = await orderService.createOrder(buyer, seller, items);

  res.send(order);
});

module.exports = {
  getAllSellers,
  getCatalogue,
  createOrder,
};

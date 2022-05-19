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
  const { items } = req.body;
  const seller = req.params.seller_id;
  const buyer = req.user._id;

  //throw error if seller does not exist
  if (!(await userService.getSellerById(seller))) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `seller with id ${seller} does not exist`
    );
  }

  const order = await orderService.createOrder(buyer, seller, items);

  res.send(order);
});

module.exports = {
  getAllSellers,
  getCatalogue,
  createOrder,
};

const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService, catalogueService } = require("../services");

const getAllSellers = catchAsync(async (req, res) => {
  const sellers = await userService.getAllSellers();
  res.send(sellers);
});

const getCatalogue = catchAsync(async (req, res) => {
  const { seller_id } = req.params;
  const catalogue = await catalogueService.getCatalogueBySellerId(seller_id);

  res.send(catalogue);
});

module.exports = {
  getAllSellers,
  getCatalogue,
};

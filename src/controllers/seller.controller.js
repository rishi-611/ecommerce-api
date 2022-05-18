const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { catalogueService } = require("../services");
const ApiError = require("../utils/ApiError");

const createCatalogue = catchAsync(async (req, res) => {
  const seller = req.user._id;
  const items = req.body;

  //check if the seller already has a catalogue
  const existingCatalogue = await catalogueService.getCatalogueBySellerId(
    seller
  );

  if (existingCatalogue) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "catalogue for this seller already exists"
    );
  }

  //create new catalogue and send to client
  const catalogue = await catalogueService.createCatalogue(seller, items);
  res.status(httpStatus.CREATED).send(catalogue);
});

module.exports = {
  createCatalogue,
};

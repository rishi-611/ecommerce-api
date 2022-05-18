const httpStatus = require("http-status");
const { Catalogue } = require("../models");
const ApiError = require("../utils/ApiError");

//create catalogue for the logged in user
//items is a list of objects {name, price}
const createCatalogue = async (seller, items) => {
  const catalogue = new Catalogue({
    seller,
    products: items,
  });

  await catalogue.save();

  return catalogue;
};

//returns catalogue associated to the seller, whose id is provided as argument
const getCatalogueBySellerId = async (sellerId) => {
  const catalogue = await Catalogue.findOne({ seller: sellerId });

  return catalogue;
};

module.exports = {
  getCatalogueBySellerId,
  createCatalogue,
};

const httpStatus = require("http-status");
const { Catalogue } = require("../models");
const productService = require("./product.service");
const ApiError = require("../utils/ApiError");

//returns catalogue associated to the seller, whose id is provided as argument
const getCatalogueBySellerId = async (sellerId) => {
  const catalogue = await Catalogue.findOne({ seller: sellerId })
    .populate("products")
    .exec();

  if (!catalogue) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "this seller does not have a catalogue"
    );
  }

  return catalogue;
};

//returns a list of all product ids from catalogue of seller
const getProductsInCatalogue = async (seller) => {
  const catalogue = await Catalogue.findOne({ seller });
  if (!catalogue) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "this seller does not have a catalogue"
    );
  }

  return catalogue.products;
};

//creates catalogue for a seller, if the seller does not already have a catalogue
const createCatalogue = async (seller, items) => {
  //for each item, either retrive the existing product from database, or create a new product in db
  const products = await Promise.all(
    items.map(async (item) => {
      //find if product already exists in db
      const existingProduct = await productService.getProductByDetails(item);
      if (existingProduct) return existingProduct;

      //else create new product in db and return
      const product = await productService.createProduct(item);
      return product;
    })
  );

  const catalogue = new Catalogue({ seller, products });
  await catalogue.save();
  return catalogue;
};

module.exports = {
  getCatalogueBySellerId,
  createCatalogue,
  getProductsInCatalogue,
};

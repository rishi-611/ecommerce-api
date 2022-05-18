const httpStatus = require("http-status");
const { Product } = require("../models");
const ApiError = require("../utils/ApiError");

const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

const getProductByDetails = async ({ name, price }) => {
  const product = await Product.findOne({ name, price });
  return product;
};

const createProduct = async ({ name, price }) => {
  const product = new Product({ name, price });
  await product.save();

  return product;
};

module.exports = { getProductByDetails, getProductById, createProduct };

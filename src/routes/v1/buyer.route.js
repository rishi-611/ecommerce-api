const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const authorizeBuyer = require("../../middlewares/authorizeBuyer");

const { buyerValidation } = require("../../validations");
const { buyerController } = require("../../controllers");

const router = express.Router();

router
  .route("/list-of-sellers")
  .get(auth(), authorizeBuyer, buyerController.getAllSellers);

router
  .route("/seller-catalogue/:seller_id")
  .get(
    auth(),
    authorizeBuyer,
    validate(buyerValidation.seller_id),
    buyerController.getCatalogue
  );

router
  .route("/create-order/:seller_id")
  .post(
    auth(),
    authorizeBuyer,
    validate(buyerValidation.seller_id),
    validate(buyerValidation.createOrder),
    buyerController.createOrder
  );

module.exports = router;

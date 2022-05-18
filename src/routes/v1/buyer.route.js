const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");

const { buyerValidation } = require("../../validations");
const { buyerController } = require("../../controllers");

const router = express.Router();

router.route("/list-of-sellers").get(auth(), buyerController.getAllSellers);

router
  .route("/seller-catalogue/:seller_id")
  .get(
    auth(),
    validate(buyerValidation.seller_id),
    buyerController.getCatalogue
  );

module.exports = router;

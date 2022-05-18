const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const authorizeSeller = require("../../middlewares/authorizeSeller");

const { sellerValidation } = require("../../validations");
const { sellerController } = require("../../controllers");

const router = express.Router();

router
  .route("/create-catalogue")
  .post(
    auth(),
    authorizeSeller,
    validate(sellerValidation.items),
    sellerController.createCatalogue
  );

module.exports = router;

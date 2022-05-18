const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const { sellerValidation } = require("../../validations");
const { sellerController } = require("../../controllers");

const router = express.Router();

router
  .route("/create-catalogue")
  .post(
    auth(),
    validate(sellerValidation.items),
    sellerController.createCatalogue
  );

router
  .route("/")
  .get(async (req, res) => res.send({ message: "hello seller" }));

module.exports = router;

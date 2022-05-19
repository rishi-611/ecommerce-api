const express = require("express");
const authRoute = require("./auth.route");
const buyerRoute = require("./buyer.route");
const sellerRoute = require("./seller.route");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/buyer", buyerRoute);
router.use("/seller", sellerRoute);

module.exports = router;

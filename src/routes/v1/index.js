const express = require("express");
// const userRoute = require("./user.route");
const authRoute = require("./auth.route");
// const productRoute = require("./product.route");
const router = express.Router();

// router.use("/products", productRoute);
// router.use("/users", userRoute);
router.use("/auth", authRoute);

router.get("/", async (req, res) => {
  res.json({ message: "hello" });
});

module.exports = router;

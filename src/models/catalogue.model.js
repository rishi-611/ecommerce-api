const mongoose = require("mongoose");

const catalogueSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timeStamps: true,
  }
);

const Catalogue = mongoose.model("Catalogue", catalogueSchema);

module.exports = { Catalogue };

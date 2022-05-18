const mongoose = require("mongoose");

const catalogueSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // all sellers can have only one catalogue
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

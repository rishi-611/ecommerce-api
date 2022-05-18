const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { ProductSchema };

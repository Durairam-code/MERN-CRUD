const mongoose = require("mongoose");

const mobiles = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: false }
);

module.exports = mongoose.model("mobile", mobiles);

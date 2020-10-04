const mongoose = require("mongoose");

const users = new mongoose.Schema(
  {
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: false }
);

module.exports = mongoose.model("user", users);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
  manager: String,
  name: String,
  price: Number,
  ingre: [
    {
      name: String,
      value: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("products", products);

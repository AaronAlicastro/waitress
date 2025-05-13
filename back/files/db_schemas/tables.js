const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tables = new Schema({
  manager: String,
  number: Number,
  customerName: {
    type: String,
    default: null,
  },
  customerPhone: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("tables", tables);

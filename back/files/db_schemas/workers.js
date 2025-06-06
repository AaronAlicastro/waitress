const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workers = new Schema({
  manager: String,
  hierarchy: {
    type: String,
    default: "waitress",
  },
  name: String,
  phone: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("workers", workers);

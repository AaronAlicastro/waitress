const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const managers = new Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("managers", managers);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tables = new Schema({
    manager: String,
    number: Number
});

module.exports = mongoose.model( "tables" , tables);
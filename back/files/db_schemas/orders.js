const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orders = new Schema({
    manager: String,
    table: String,
    tableNumber: Number,
    productsAsked: [
        {
            product: String,
            productCount: Number,
            totalProduct: Number,
            without: [String]
        }
    ],
    total: Number
});

module.exports = mongoose.model( "orders" , orders);
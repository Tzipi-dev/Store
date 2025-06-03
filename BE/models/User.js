const mongoose = require('mongoose')
const Buy = require('./Buy')
const Product = require('./Product')
const UserDetails = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    allBuys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Buy
        }
    ],
    FavoriteProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product
        }
    ]
})
module.exports = mongoose.model("User", UserDetails)
const mongoose = require('mongoose')
const User = require('./User')
const Product = require('./Product')
const BuyDetails = mongoose.Schema({
   dateOfBuy: Date,
   owner: User,
   products: [Product],
   dateOfComming: Date,
})
module.exports = mongoose.model("Buy", BuyDetails)
const mongoose = require('mongoose');
const BuyDetails = new mongoose.Schema({
  dateOfBuy: Date,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  dateOfComming: Date
});
module.exports = mongoose.model("Buy", BuyDetails);
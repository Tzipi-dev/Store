const mongoose = require('mongoose')
const SaleDetails = mongoose.Schema({
    precent: Number,
    ParticipatingProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})
module.exports = mongoose.model("Sale", SaleDetails)
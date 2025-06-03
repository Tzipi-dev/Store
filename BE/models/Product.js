const mongoose = require('mongoose')
const productDetails = new mongoose.Schema({
    name: String,
    price: Number,
    rating: Number,
    amountOfBuys: Number,
    description: String,
    comments: [String],
    category: {
        type: String,
        enum: ['עגילים', 'צמידים', 'שעונים', 'שרשראות', 'טבעות']
    },
    color: {
        type: String,
        enum: ['כסף', 'זהב']
    },
    sales: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale'
    }],
    imageUrl: String,
    dateOfStart: Date,
})
module.exports = mongoose.model('Product', productDetails)
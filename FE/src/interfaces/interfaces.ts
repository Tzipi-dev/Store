import type { ObjectId } from "mongoose"

export interface Cart {
    products: Product[]
}

export interface Product {
    _id?: string
    name: String,
    price: Number,
    rating: Number,
    amountOfBuys: Number,
    description: String,
    comments?: [String],
    category: {
        type: String,
        enum: ['עגילים', 'צמידים', 'שעונים', 'שרשראות', 'טבעות']
    },
    color: {
        type: String,
        enum: ['כסף', 'זהב']
    },
    sales?: [{
        type: ObjectId
    }],
    imageUrl: String,
    dateOfStart: Date,
}
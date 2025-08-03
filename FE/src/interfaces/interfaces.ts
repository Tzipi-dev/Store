import type { ObjectId } from "mongoose"

export interface Cart {
    products: Product[]
}

export interface Product {
    _id?: string
    name: string,
    price: number,
    rating: number,
    amountOfBuys: number,
    description: string,
    comments?: [string],
    category: {
        type: string,
        enum: ['עגילים', 'צמידים', 'שעונים', 'שרשראות', 'טבעות']
    },
    color: {
        type: string,
        enum: ['כסף', 'זהב']
    },
    sales?: [{
        type: ObjectId
    }],
    imageUrl: string,
    dateOfStart: Date,
   views: number
}
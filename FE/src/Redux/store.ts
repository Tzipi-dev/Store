import { configureStore } from "@reduxjs/toolkit";
import cartSlice from '../Redux/global/cart'
const store = configureStore({
    reducer: {
        cartSlice: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(

        )
})
export default store
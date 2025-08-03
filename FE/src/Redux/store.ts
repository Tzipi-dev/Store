import { configureStore } from "@reduxjs/toolkit";
import cartSlice from '../Redux/global/cart'
import endPointsProducts from "./api/products/endPointsProducts";
import apiProducts from "./api/products/apiProducts";
const store = configureStore({
    reducer: {
    [endPointsProducts.reducerPath]: endPointsProducts.reducer,
           cartSlice: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiProducts.middleware

        )
})
export default store
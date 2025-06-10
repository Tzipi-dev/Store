import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiProducts = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        credentials: 'include',
    }),
    tagTypes: ["Product"],
 endpoints: () => ({
        
    }),
});

export default apiProducts;




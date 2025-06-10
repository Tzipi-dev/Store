import type { Product } from "../../../interfaces/interfaces";
import apiProducts from "./apiProducts";
const endPointsProducts = apiProducts.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], void>({
            query: () => "/products",
            providesTags: ["Product"],
        }),
        getProductById: builder.query<Product, string>({
            query: (_id) => `/products/${_id}`,
            providesTags: ["Product"],
          }),
      
        addProduct: builder.mutation<Product, Product>({
            query: (newFound) => ({
                url: "/products",
                method: "POST",
                body: newFound,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation<Product, Product>({
            query: (updatefound) => ({
                url: `/products/${updatefound._id}`,
                method: "PUT",
                body: updatefound,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: builder.mutation<Product, Product>({
            query: (deletefound) => ({
                url: `/products/${deletefound._id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
        
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    
} = endPointsProducts;
export default endPointsProducts
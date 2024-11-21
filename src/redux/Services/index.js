import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, endpoints } from "../Constant";

export const Apis = createApi({
    reducerPath: 'Apis',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().persistedData.token;
            console.log('state ===>', token);
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: data => ({
                url: endpoints.REGISTER,
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: endpoints.LOGIN,
                method: 'POST',
                body: data
            })
        }),
        forgetPassword: builder.mutation({
            query: data => ({
                url: endpoints.FORGET_PASSWORD,
                method: 'POST',
                body: data
            })
        }),
        verifyOTP: builder.mutation({
            query: ({ code, id }) => {
                return {
                    url: endpoints.OTP_VERIFY(code, id),
                    method: 'POST',
                }
            }
        }),
        resetPassword: builder.mutation({
            query: data => ({
                url: endpoints.RESET_PASSWORD,
                method: 'POST',
                body: data
            })
        }),
        changePassword: builder.mutation({
            query: data => ({
                url: endpoints.CHANGE_PASSWORD,
                method: 'POST',
                body: data
            })
        }),
        createProduct: builder.mutation({
            query: data => ({
                url: endpoints.ADD_PRODUCT,
                method: 'POST',
                body: data
            })
        }),
        myProducts: builder.query({
            query: () => ({
                url: endpoints.GET_MY_PRODUCTS,
                method: 'GET',
            })
        }),
        getAllCompanies: builder.query({
            query: () => ({
                url: endpoints.GET_ALL_COMPANIES,
                method: 'GET'
            })
        }),
        getAllProducts: builder.mutation({
            query: (CompanyId) => ({
                url: endpoints.GET_ALL_PRODUCTS,
                method: 'POST',
                body: CompanyId
            })
        }),
        searchProducts: builder.mutation({
            query: (text) => ({
                url: endpoints.SEARCH_PRODUCTS,
                method: 'POST',
                body: text
            })
        }),
        editProfile: builder.mutation({
            query: (data) => ({
                url: endpoints.EDIT_PROFILE,
                method: 'POST',
                body: data,
            })
        }),
        getProductCateories: builder.query({
            query: () => ({
                url: endpoints.GET_PRODUCT_CATEGORIES,
                method: 'GET',
            })
        }),
        productFilterByCategories: builder.mutation({
            query: (data) => ({
                url: endpoints.PRODUCT_FILTER_BY_CATEGORIES,
                method: 'POST',
                body: data
            })
        }),
        deleteProduct: builder.mutation({
            query: (data) => ({
                url: endpoints.DELETE_PRODUCT,
                method: 'POST',
                body: data
            })
        }),
        editProduct: builder.mutation({
            query: (data) => ({
                url: endpoints.EDIT_PRODUCT,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useCreateProductMutation,
    useGetAllProductsMutation,
    useLazyMyProductsQuery,
    useLazyGetAllCompaniesQuery,
    useSearchProductsMutation,
    useEditProfileMutation,
    useLazyGetProductCateoriesQuery,
    useProductFilterByCategoriesMutation,
    useDeleteProductMutation,
    useEditProductMutation
} = Apis;
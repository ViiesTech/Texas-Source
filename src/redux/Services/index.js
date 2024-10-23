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
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation
} = Apis;
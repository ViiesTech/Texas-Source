import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../Services';


const initialState = {
    // role: '',
    token: '',
    baseUrl: '',
    user: {},
    cart: [],
}

export const Slice = createSlice({
    name: 'Slice',
    initialState,
    reducers: {
        // UserType: (state, action) => {
        //     state.role = action.payload;
        // },
        Logout: (state) => {
            state.user = null,
                state.token = null;
        },
        addToCart: (state, action) => {
            state.cart = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(Apis.endpoints.login.matchFulfilled, (state, action) => {
            if (action.payload.data) {
                state.user = action.payload?.data
                state.token = action.payload?.data?.token
            }
        }),
            builder.addMatcher(Apis.endpoints.getAllCompanies.matchFulfilled, (state, action) => {
                // console.log(action.payload.baseUrl)
                if (action.payload) {
                    state.baseUrl = action.payload?.baseUrl
                }
            }),
            builder.addMatcher(Apis.endpoints.editProfile.matchFulfilled, (state, action) => {
                if (action.payload.data) {
                    state.user = action.payload?.data
                }
            })
    }


});

export const { UserType, Logout, addToCart } = Slice.actions;

export default Slice.reducer;
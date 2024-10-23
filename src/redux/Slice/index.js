import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../Services';


const initialState = {
    role: '',
    token: '',
    user: {}
}

export const Slice = createSlice({
    name: 'Slice',
    initialState,
    reducers: {
        UserType: (state, action) => {
            state.role = action.payload;
        },
        Logout: (state) => {
            state.user = null,
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(Apis.endpoints.login.matchFulfilled, (state, action) => {
            state.user = action.payload.data
            state.token = action.payload.data.token
        })
    }


});

export const { UserType, Logout } = Slice.actions;

export default Slice.reducer;
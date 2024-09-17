import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { USER_ACTION_LOGIN, USER_ACTION_REGISTER } from '../actions/user.action';



const initialState = {
    data: null,
    isLoading: false,
    error: null
}


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearState: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(USER_ACTION_LOGIN.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(USER_ACTION_LOGIN.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(USER_ACTION_LOGIN.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })



            .addCase(USER_ACTION_REGISTER.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(USER_ACTION_REGISTER.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(USER_ACTION_REGISTER.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});



export default userSlice;

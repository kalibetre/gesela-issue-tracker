import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.currentUser = action.payload.user;
            localStorage.setItem('token', action.payload.token);
        },
        authFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.currentUser = null;
            localStorage.removeItem('token');
        },
    },
});

export const { loginStart, authSuccess, authFail, logout } = authSlice.actions;

export default authSlice;

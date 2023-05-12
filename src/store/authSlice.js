import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.currentUser = action.payload.user;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem(
                'currentUser',
                JSON.stringify(action.payload.user)
            );
        },
        authFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.currentUser = null;
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
        },
    },
});

export const { loginStart, authSuccess, authFail, logout } = authSlice.actions;

export default authSlice;

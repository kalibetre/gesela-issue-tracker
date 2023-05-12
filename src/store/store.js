import { configureStore } from '@reduxjs/toolkit';
import authApi from '../api/authApi';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authApi from '../api/authApi';
import issueApi from '../api/issueApi';
import userApi from '../api/userApi';
import authSlice from './authSlice';
import issueSlice from './issueSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        issues: issueSlice.reducer,
        user: userSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [issueApi.reducerPath]: issueApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(userApi.middleware)
            .concat(issueApi.middleware),
});

setupListeners(store.dispatch);

export default store;

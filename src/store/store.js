import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import geselaApi from '../api/geselaApi';

const store = configureStore({
    reducer: {
        [geselaApi.reducerPath]: geselaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(geselaApi.middleware),
});

setupListeners(store.dispatch);

export default store;

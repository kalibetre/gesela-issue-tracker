import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_URL;

const geselaApi = createApi({
    reducerPath: 'geselaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/v1`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});

export const {} = geselaApi;

export default geselaApi;

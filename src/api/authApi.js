import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_URL;

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: { email, password },
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
export default authApi;

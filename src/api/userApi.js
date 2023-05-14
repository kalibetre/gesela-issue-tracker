import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_URL;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/users`,
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().auth;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
        }),
        updateProfile: builder.mutation({
            query: (profile) => ({
                url: '/profile',
                method: 'PUT',
                body: profile,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, ...changes }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: changes,
            }),
        }),
        changeRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/${id}/role`,
                method: 'PUT',
                body: { role },
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateUserMutation,
    useChangeRoleMutation,
} = userApi;

export default userApi;

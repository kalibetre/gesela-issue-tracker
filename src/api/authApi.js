import { saveToken } from '../utils/utils';
import geselaApi from './geselaApi';

const authApi = geselaApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: '/auth/register',
                method: 'POST',
                body: user,
            }),
            transformResponse: (response) => {
                saveToken(response);
                return response;
            },
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: { email, password },
            }),
            transformResponse: (response) => {
                saveToken(response);
                return response;
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
export default authApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_URL;

export const issueApi = createApi({
    reducerPath: 'issueApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/issues`,
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().auth;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createIssue: builder.mutation({
            query: (issue) => ({
                url: '',
                method: 'POST',
                body: issue,
            }),
        }),
        getIssues: builder.query({
            query: () => ({
                url: '',
                method: 'GET',
            }),
        }),
        getIssue: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
        }),
        updateIssue: builder.mutation({
            query: ({ id, ...changes }) => ({
                url: `/issues/${id}`,
                method: 'PUT',
                body: changes,
            }),
        }),
        deleteIssue: builder.mutation({
            query: (id) => ({
                url: `/issues/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateIssueMutation,
    useGetIssuesQuery,
    useGetIssueQuery,
    useUpdateIssueMutation,
    useDeleteIssueMutation,
} = issueApi;

export default issueApi;

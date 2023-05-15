import geselaApi from './geselaApi';

const issueApi = geselaApi.injectEndpoints({
    tagTypes: ['Issues'],
    endpoints: (builder) => ({
        createIssue: builder.mutation({
            query: (issue) => ({
                url: '/issues',
                method: 'POST',
                body: issue,
            }),
            invalidatesTags: [{ type: 'Issues', id: 'LIST' }],
        }),
        getIssues: builder.query({
            query: () => ({
                url: '/issues',
                method: 'GET',
            }),
            providesTags: (result) => {
                if (!result) return [{ type: 'Issues', id: 'LIST' }];
                return [
                    ...result.map(({ uuid }) => ({
                        type: 'Issues',
                        uuid,
                    })),
                    { type: 'Issues', id: 'LIST' },
                ];
            },
        }),
        getIssue: builder.query({
            query: (id) => ({
                url: `/issues/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Issues', id }],
        }),
        updateIssue: builder.mutation({
            query: ({ id, ...changes }) => ({
                url: `/issues/${id}`,
                method: 'PUT',
                body: changes,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Issues', id },
            ],
        }),
        deleteIssue: builder.mutation({
            query: (id) => ({
                url: `/issues/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Issues', id },
            ],
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

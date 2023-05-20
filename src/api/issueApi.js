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
            query: (uuid) => ({
                url: `/issues/${uuid}`,
                method: 'GET',
            }),
            providesTags: (result, error, uuid) => [{ type: 'Issues', uuid }],
        }),
        updateIssue: builder.mutation({
            query: ({ uuid, ...changes }) => ({
                url: `/issues/${uuid}`,
                method: 'PUT',
                body: changes,
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Issues', uuid },
            ],
        }),
        deleteIssue: builder.mutation({
            query: (uuid) => ({
                url: `/issues/${uuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Issues', uuid },
            ],
        }),
        archiveIssue: builder.mutation({
            query: (uuid) => ({
                url: `/issues/${uuid}/archive`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Issues', uuid },
            ],
        }),
        restoreIssue: builder.mutation({
            query: (uuid) => ({
                url: `/issues/${uuid}/restore`,
                method: 'PUT',
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Issues', uuid },
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
    useArchiveIssueMutation,
    useRestoreIssueMutation,
} = issueApi;

export default issueApi;

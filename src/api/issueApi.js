import geselaApi from './geselaApi';

const issueApi = geselaApi.injectEndpoints({
    endpoints: (builder) => ({
        createIssue: builder.mutation({
            query: (issue) => ({
                url: '/issues',
                method: 'POST',
                body: issue,
            }),
        }),
        getIssues: builder.query({
            query: () => ({
                url: '/issues',
                method: 'GET',
            }),
        }),
        getIssue: builder.query({
            query: (id) => ({
                url: `/issues/${id}`,
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

import geselaApi from './geselaApi';

const userApi = geselaApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/users/profile',
                method: 'GET',
            }),
        }),
        updateProfile: builder.mutation({
            query: (profile) => ({
                url: '/users/profile',
                method: 'PUT',
                body: profile,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, ...changes }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: changes,
            }),
        }),
        changeRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/users/${id}/role`,
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

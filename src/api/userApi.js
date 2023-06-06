import geselaApi from './geselaApi';

const userApi = geselaApi.injectEndpoints({
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/users/profile',
                method: 'GET',
            }),
            providesTags: (result) => {
                return [{ type: 'Users', id: 'PROFILE' }];
            },
        }),
        getRoles: builder.query({
            query: () => ({
                url: '/users/roles',
                method: 'GET',
            }),
            providesTags: (result) => {
                return [{ type: 'Users', id: 'ROLE' }];
            },
        }),
        getNotifications: builder.query({
            query: () => ({
                url: '/users/notifications',
                method: 'GET',
            }),
            providesTags: (result) => {
                if (!result) return [{ type: 'Notifications', id: 'LIST' }];
                return [
                    ...result.map(({ uuid }) => ({
                        type: 'Notifications',
                        uuid,
                    })),
                    { type: 'Notifications', id: 'LIST' },
                ];
            },
        }),
        updateProfile: builder.mutation({
            query: (profile) => ({
                url: '/users/profile',
                method: 'PUT',
                body: profile,
            }),
            invalidatesTags: [{ type: 'Users', id: 'PROFILE' }],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...changes }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: changes,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
        }),
        changeRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/users/${id}/role`,
                method: 'PUT',
                body: { role },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useGetRolesQuery,
    useGetNotificationsQuery,
    useUpdateProfileMutation,
    useUpdateUserMutation,
    useChangeRoleMutation,
} = userApi;

export default userApi;

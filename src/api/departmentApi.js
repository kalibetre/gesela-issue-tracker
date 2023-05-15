import geselaApi from './geselaApi';

const departmentApi = geselaApi.injectEndpoints({
    tagTypes: ['Departments'],
    endpoints: (builder) => ({
        createDepartment: builder.mutation({
            query: (department) => ({
                url: '/departments',
                method: 'POST',
                body: department,
            }),
            invalidatesTags: [{ type: 'Departments', id: 'LIST' }],
        }),
        getDepartments: builder.query({
            query: () => ({
                url: '/departments',
                method: 'GET',
            }),
            providesTags: (result) => {
                if (!result) return [{ type: 'Departments', id: 'LIST' }];
                return [
                    ...result.map(({ uuid }) => ({
                        type: 'Departments',
                        uuid,
                    })),
                    { type: 'Departments', id: 'LIST' },
                ];
            },
        }),
        updateDepartment: builder.mutation({
            query: ({ uuid, ...changes }) => ({
                url: `/departments/${uuid}`,
                method: 'PUT',
                body: changes,
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Departments', uuid },
            ],
        }),
        deleteDepartment: builder.mutation({
            query: (uuid) => ({
                url: `/${uuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Departments', uuid },
            ],
        }),
    }),
});

export const {
    useCreateDepartmentMutation,
    useGetDepartmentsQuery,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
} = departmentApi;

export default departmentApi;

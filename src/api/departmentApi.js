import geselaApi from './geselaApi';

const departmentApi = geselaApi.injectEndpoints({
    endpoints: (builder) => ({
        createDepartment: builder.mutation({
            query: (department) => ({
                url: '/departments',
                method: 'POST',
                body: department,
            }),
        }),
        getDepartments: builder.query({
            query: () => ({
                url: '/departments',
                method: 'GET',
            }),
        }),
        updateDepartment: builder.mutation({
            query: ({ id, ...changes }) => ({
                url: `/departments/${id}`,
                method: 'PUT',
                body: changes,
            }),
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
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

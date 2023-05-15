import geselaApi from './geselaApi';

const employeeApi = geselaApi.injectEndpoints({
    tagTypes: ['Employees'],
    endpoints: (builder) => ({
        createEmployee: builder.mutation({
            query: (employee) => ({
                url: '/employees',
                method: 'POST',
                body: employee,
            }),
            invalidatesTags: [{ type: 'Employees', id: 'LIST' }],
        }),
        getEmployees: builder.query({
            query: () => ({
                url: '/employees',
                method: 'GET',
            }),
            providesTags: (result) => {
                if (!result) return [{ type: 'Employees', id: 'LIST' }];
                return [
                    ...result.map(({ uuid }) => ({
                        type: 'Employees',
                        uuid,
                    })),
                    { type: 'Employees', id: 'LIST' },
                ];
            },
        }),
        updateEmployee: builder.mutation({
            query: ({ uuid, ...changes }) => ({
                url: `/employees/${uuid}`,
                method: 'PUT',
                body: changes,
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Employees', uuid },
            ],
        }),
        deleteEmployee: builder.mutation({
            query: (uuid) => ({
                url: `/employees/${uuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Employees', uuid },
            ],
        }),
    }),
});

export const {
    useCreateEmployeeMutation,
    useGetEmployeesQuery,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApi;

export default employeeApi;

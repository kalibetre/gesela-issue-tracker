import geselaApi from './geselaApi';

const customerApi = geselaApi.injectEndpoints({
    tagTypes: ['Customers'],
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => ({
                url: '/customers',
                method: 'GET',
            }),
            providesTags: (result) => {
                if (!result) return [{ type: 'Customers', id: 'LIST' }];
                return [
                    ...result.map(({ uuid }) => ({
                        type: 'Customers',
                        uuid,
                    })),
                    { type: 'Customers', id: 'LIST' },
                ];
            },
        }),
        updateCustomer: builder.mutation({
            query: ({ uuid, ...changes }) => ({
                url: `/customers/${uuid}`,
                method: 'PUT',
                body: changes,
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Customers', uuid },
            ],
        }),
        deleteCustomer: builder.mutation({
            query: (uuid) => ({
                url: `/customers/${uuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: 'Customers', uuid },
            ],
        }),
    }),
});

export const {
    useGetCustomersQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customerApi;

export default customerApi;

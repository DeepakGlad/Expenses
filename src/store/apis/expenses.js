// import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";

// const expensesApi = createApi({
//     reducerPath: "expenseslist",
//     baseQuery: fetchBaseQuery({
//         baseUrl: "http://localhost:3001"
//     }),
//     endpoints(builder) {
//         return {
//             fetchExpenses: builder.query({
//                 query:(id)=>{
//                     return{
//                        url: "/expenses",
//                        params: {
//                         id: id
//                        },
//                        method: "get" 
//                     }

//                 }
//             })
//         }
//     }
// });

// export const { useFetchExpensesQuery } = expensesApi;
// export { expensesApi }


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the expenses API with fetch, add, and delete functionality
const expensesApi = createApi({
    reducerPath: "expenseslist",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001" // Replace with your JSON server URL
    }),
    endpoints(builder) {
        return {
            fetchExpenses: builder.query({
                query: () => ({
                    url: "/expenses",
                    method: "GET",
                }),
            }),
            addExpense: builder.mutation({
                query: (expense) => ({
                    url: "/expenses",
                    method: "POST",
                    body: expense,
                }),
            }),
            deleteExpense: builder.mutation({
                query: (id) => ({
                    url: `/expenses/${id}`,
                    method: "DELETE",
                }),
            }),
        };
    }
});

// Export the hooks for usage in components
export const { useFetchExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } = expensesApi;
export { expensesApi };

import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";

const expensesApi = createApi({
    reducerPath: "expenseslist",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    endpoints(builder) {
        return {
            fetchExpenses: builder.query({
                query:(id)=>{
                    return{
                       url: "/expenses",
                       params: {
                        id: id
                       },
                       method: "get" 
                    }

                }
            })
        }
    }
});

export const { useFetchExpensesQuery } = expensesApi;
export { expensesApi }
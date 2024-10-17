
import { configureStore } from "@reduxjs/toolkit";
import { expensesReducer } from "./slice/expenses";
import { expensesApi } from "./apis/expenses";

const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        [expensesApi.reducerPath]: expensesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(expensesApi.middleware);
    }
});

export { store };
export { useFetchExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } from './apis/expenses'; 

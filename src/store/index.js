import { configureStore } from "@reduxjs/toolkit";
import { addExpenses, rmExpenses } from "./slice/expenses";

import { expensesReducer } from "./slice/expenses";

import { expensesApi } from "./apis/expenses";

const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        [expensesApi.reducerPath]:expensesApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(expensesApi.middleware);
    }
});

export {store, addExpenses, rmExpenses};


export { useFetchExpensesQuery } from './apis/expenses';
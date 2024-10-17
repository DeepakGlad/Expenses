// import { configureStore } from "@reduxjs/toolkit";
// import { addExpenses, rmExpenses } from "./slice/expenses";

// import { expensesReducer } from "./slice/expenses";

// import { expensesApi } from "./apis/expenses";

// const store = configureStore({
//     reducer: {
//         expenses: expensesReducer,
//         [expensesApi.reducerPath]:expensesApi.reducer
//     },
//     middleware: (getDefaultMiddleware) => {
//             return getDefaultMiddleware().concat(expensesApi.middleware);
//     }
// });

// export {store, addExpenses, rmExpenses};


// export { useFetchExpensesQuery } from './apis/expenses';
import { configureStore } from "@reduxjs/toolkit";
import { expensesReducer } from "./slice/expenses";
import { expensesApi } from "./apis/expenses"; // Correctly import the API slice

// Configure the store with the reducers and middleware
const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        [expensesApi.reducerPath]: expensesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(expensesApi.middleware);
    }
});

// Export the store and mutation/query hooks
export { store };
export { useFetchExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } from './apis/expenses'; // Ensure these mutations are exported

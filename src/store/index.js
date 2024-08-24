import { configureStore } from "@reduxjs/toolkit";
import { addExpenses, rmExpenses } from "./slice/expenses";

import { expensesReducer } from "./slice/expenses";

const store = configureStore({
    reducer: {
        expenses: expensesReducer
    }
});

export {store, addExpenses, rmExpenses};




import { createSlice } from "@reduxjs/toolkit";

const storeslice = createSlice({
    name: "expenses",
    initialState: [],
    reducers: {
        addExpenses(state, action) {
            state.push(action.payload); 
        },
        rmExpenses(state, action) {
            return state.filter((expense) => expense.name !== action.payload); 
        }
    }
});

export const { addExpenses, rmExpenses } = storeslice.actions;
export const expensesReducer = storeslice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const storeslice = createSlice({
    name: "expenses",
    initialState: [],
    reducers: {
        addExpenses(state,action){

            state.push(action.payload);
        },
        rmExpenses(state,action){

            const index = state.indexOf(action.payload);
            state.splice(index, 1);
        }
    }
});

export const  { addExpenses, rmExpenses } = storeslice.actions;

export const expensesReducer =  storeslice.reducer;
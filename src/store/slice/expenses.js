// import { createSlice } from "@reduxjs/toolkit";

// const storeslice = createSlice({
//     name: "expenses",
//     initialState: [],
//     reducers: {
//         addExpenses(state,action){

//             state.push(action.payload);
//         },
//         rmExpenses(state,action){

//             const index = state.indexOf(action.payload);
//             state.splice(index, 1);
//         }
//     }
// });

// export const  { addExpenses, rmExpenses } = storeslice.actions;

// export const expensesReducer =  storeslice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const storeslice = createSlice({
    name: "expenses",
    initialState: [],
    reducers: {
        addExpenses(state, action) {
            state.push(action.payload);  // Add new expense
        },
        rmExpenses(state, action) {
            return state.filter((expense) => expense.name !== action.payload); // Correct removal logic
        }
    }
});

export const { addExpenses, rmExpenses } = storeslice.actions;
export const expensesReducer = storeslice.reducer;

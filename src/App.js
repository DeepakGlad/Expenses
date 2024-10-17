
// import './App.css';

// import { useDispatch, useSelector } from "react-redux";
// import { addExpenses, rmExpenses } from "./store";
// import { useState } from 'react';

// import {useFetchExpensesQuery} from './store';

// function App() {
//   const [expense, setExpense] = useState("");
//   const dispatch = useDispatch();
//   const expenseslist = useSelector((state) => {
//       return state.expenses;
//   });

//   console.log(expenseslist);
//   const handlechange = (event)=>{
//     setExpense(event.target.value); 
//   }

//   const submit = (event)=>{
//     event.preventDefault();
//     if (expense) { 
//       dispatch(addExpenses(expense)); 
//       setExpense(""); 
//     }
//   }
//   const rmState = (expenserm)=>{
//     dispatch(rmExpenses(expenserm)); 
//   }
//   const result = useFetchExpensesQuery('1');

//   console.log(result);
//   // const list2 = list1.map((value,index)=>{
//   //   return <p key={index}>{value.name}</p>
//   // })
//   const list =  expenseslist.map((value,index)=>{
//     return (<p key={index}>{value}<span onClick={()=>rmState(expense)}>X</span></p>);
//   })
//   return (
//     <div className="App" >
//       <form onSubmit={submit} >
//       <input value={expense} onChange={handlechange}/>
    
//       <button >Subimt</button>
//      {list}
//      {/* {list2} */}
//       </form>
//     </div>
//   );
// }



import './App.css';
import { useState } from 'react';
import { useFetchExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } from './store';

function App() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const { data: expensesFromServer = [], refetch } = useFetchExpensesQuery('1');
  const [addExpense] = useAddExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  // Calculate total number of expenses and total amount
  const totalExpenses = expensesFromServer.length;
  const totalAmount = expensesFromServer.reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0);

  const handleChange = (event) => {
    setExpense(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (expense && amount) {
      const newExpense = { name: expense, amount: parseFloat(amount) };
      await addExpense(newExpense);
      refetch(); // Refetch the data after adding
      setExpense("");
      setAmount("");
    }
  };

  const rmState = async (expenseItem) => {
    await deleteExpense(expenseItem.id); // Send the DELETE request to json-server
    refetch(); // Refetch the data after deletion
  };

  // Colors array to give each expense a different background color
  const colors = ["bg-red-100", "bg-blue-100", "bg-yellow-100", "bg-green-100", "bg-purple-100"];

  const renderedList = expensesFromServer.map((value, index) => {
    return (
      <div 
        key={value.id} 
        className={`flex justify-between items-center ${colors[index % colors.length]} p-3 rounded-lg shadow-sm mb-2 w-full`}
      >
        <p className="text-lg font-semibold">{value.name} - ${value.amount}</p>
        <button 
          className="bg-transparent hover:bg-red-300 p-2 rounded-full"
          onClick={() => rmState(value)}
        >
          <img src="https://img.icons8.com/emoji/48/000000/wastebasket-emoji.png" alt="delete" className="w-6 h-6" />
        </button>
      </div>
    );
  });

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url('https://source.unsplash.com/random/1600x900')` }} // Replace this with your desired image
    >
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md bg-opacity-90">
        <h1 className="text-2xl font-bold mb-4 text-center">Expense Tracker</h1>
        <p className="text-center text-gray-600 mb-4">Total Expenses: {totalExpenses}</p>
        <p className="text-center text-green-600 mb-6 text-xl">Total Amount: ${totalAmount.toFixed(2)}</p>
        
        <form onSubmit={submit} className="mb-4 flex flex-col items-center w-full">
          <input 
            value={expense} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2" 
            placeholder="Add expense name"
          />
          <input 
            value={amount} 
            onChange={handleAmountChange} 
            type="number"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2" 
            placeholder="Add expense amount"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
          >
            Submit
          </button>
        </form>
        
        <div className="w-full">
          {renderedList}
        </div>
      </div>
    </div>
  );
}

export default App;

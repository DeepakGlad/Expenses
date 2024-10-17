
import './App.css';
import { useState } from 'react';
import { useFetchExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } from './store';

function App() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const { data: expensesFromServer = [], refetch } = useFetchExpensesQuery('1');
  const [addExpense] = useAddExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();


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
      refetch(); 
      setExpense("");
      setAmount("");
    }
  };

  const rmState = async (expenseItem) => {
    await deleteExpense(expenseItem.id); 
    refetch(); 
  };


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
      style={{ backgroundImage: `url('https://source.unsplash.com/random/1600x900')` }} 
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

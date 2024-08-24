
import './App.css';
import {store} from './store';
import { useDispatch, useSelector } from "react-redux";
import { addExpenses, rmExpenses } from "./store";
import { useState } from 'react';
function App() {
  const [expense, setExpense] = useState("");
  const dispatch = useDispatch();
  const expenseslist = useSelector((state) => {
      return state.expenses;
  });

  console.log(expenseslist);
  const handlechange = (event)=>{
    setExpense(event.target.value); 
  }

  const submit = (event)=>{
    event.preventDefault();
    if (expense) { 
      dispatch(addExpenses(expense)); 
      setExpense(""); 
    }
  }
  const rmState = (expenserm)=>{
    dispatch(rmExpenses(expenserm)); 
  }

  const list =  expenseslist.map((value,index)=>{
    return (<p key={index}>{value}<span onClick={()=>rmState(expense)}>X</span></p>);
  })
  return (
    <div className="App" >
      <form onSubmit={submit} >
      <input value={expense} onChange={handlechange}/>
    
      <button >Subimt</button>
     {list}
      </form>
    </div>
  );
}

export default App;

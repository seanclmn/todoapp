import React, {useState,useEffect} from 'react'
import './App.css';

import Todo from './components/todo/Todo';
import SearchFilter from './components/searchfilter/SearchFilter';
import AddTodo from './components/addtodo/AddTodo';

function App() {
  const [json,setJson]=useState([{}])
  const [filter,setFilter]=useState('')
  const [searchCriteria,setSearchCriteria]=useState('')

  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    


  useEffect(()=>{
    fetch('http://localhost:8080/todos')
      .then((res)=>res.json())
      .then((res)=>setJson(res))
  },[])

  if(!json.length) return null
  return (
    <div className="App">
      {/* <div className='sidepanel-container'>
        <SearchFilter filter={filter} setFilter={setFilter}/>
        <AddTodo/>
      </div> */}
      <div className='search-filter-container'>
          <SearchFilter filter={filter} setFilter={setFilter}/>
        </div>
      <div className='todos-container'> 

        
        <div className="todos-header">
          <h1 id="page-title">My Todos</h1>
          <h1 id="page-title">{date}</h1>
        </div>
        {json.map((todo)=>
          <Todo key={todo.Todo} todo={todo} todos={json} setTodo={setJson}/>)
        }
        <AddTodo/>

      </div>


    </div>
  );
}

export default App;

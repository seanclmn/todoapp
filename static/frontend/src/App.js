import React, {useState,useEffect} from 'react'
import './App.css';

import Todo from './components/todo/Todo';
import SearchFilter from './components/searchfilter/SearchFilter';
import AddTodo from './components/addtodo/AddTodo';

function App() {
  const [loading,setLoading]=useState(true)
  const [projects,setProjects]=useState([])
  const [todos,setTodos]=useState([{}])
  const [filter,setFilter]=useState('')
  const [searchCriteria,setSearchCriteria]=useState('')

  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    

  function filterCheck(arr,filter){
    let contains = false

    for(let i=0;i<arr.length;i++){
      if(arr[i].includes(filter)){
        contains=true
      }
    }

    return contains
  }

  useEffect(()=>{
    async function fetchTodos(){
      await fetch('http://localhost:8080/todos')
      .then((res)=>res.json())
      .then((res)=>setTodos(res))
      .then((res)=>setProjects())
      .then(setLoading(false))

    }
    fetchTodos()

  },[])

  let projectsToRender
  if (todos[0].Projects){
    projectsToRender = todos[0].Projects.map(project=>{
      return <p key={project}>{project}</p>
    })
  }




  if(loading) return null
  return (
    <div className="App">
      <div className='search-filter-container'>
          <SearchFilter filter={filter} setFilter={setFilter}/>
      </div>
      
      <div className='todos-container'> 
        <div className="todos-header">
          <h1 id="page-title">My Todos</h1>
          <h1 id="page-title">{date}</h1>
        </div>
        
        {/* {
        
        todos.filter(todo=>todo.Projects.filter()
          
          .map((todo)=>
          <Todo key={todo.Todo} todo={todo} todos={todos} setTodo={setTodos}/>))



        } */}
        {todos.map((todo)=>
          <Todo key={todo.Todo} todo={todo} todos={todos} setTodo={setTodos}/>)
        }

        <AddTodo todos={todos}/>

      </div>


    </div>
  );
}

export default App;

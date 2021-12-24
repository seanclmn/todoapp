import React, {useState,useEffect} from 'react'
import './App.css';

import Todo from './components/todo/Todo';
import SearchFilter from './components/searchfilter/SearchFilter';
import AddTodo from './components/addtodo/AddTodo';

function App() {
  const [loading,setLoading]=useState(true)
  const [projects,setProjects]=useState([])
  const [todos,setTodos]=useState([{}])
  const [todosToRender,setTodosToRender]=useState([{}])
  const [filter,setFilter]=useState('')
  const [filterToggle,setFilterToggle]=useState('projects')
  const [searchCriteria,setSearchCriteria]=useState('')

  const today = new Date();
  const date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    

  //fetch todos from server, and set loading to false
  useEffect(()=>{
    function fetchTodos(){
      fetch('http://localhost:8080/todos')
      .then((res)=>res.json())
      .then((res)=>setTodos(res))
      .then((res)=>setProjects())
      .then(setLoading(false))

    }
    fetchTodos()

  },[])


  //Everytime the filter changes, this changes which todos to render
  useEffect(()=>{
    if (todos[0].Projects){

      if(filterToggle==='projects'){
        const newTodosToRender = todos.filter(todo=>todo.Projects.filter(project=>project.includes(filter)).length!==0)
        setTodosToRender([...newTodosToRender])


      }else{
        const newTodosToRender = todos.filter(todo=>todo.Contexts.filter(project=>project.includes(filter)).length!==0)
        setTodosToRender([...newTodosToRender])

      }

    }
  },[filter])



  if(loading) return null
  return (
    <div className="App">
      <div className='search-filter-container'>
          <SearchFilter filter={filter} setFilter={setFilter} setFilterToggle={setFilterToggle}/>
      </div>
      
      <div className='todos-container'> 
        <div className="todos-header">
          <h1 id="page-title">My Todos</h1>
          <h1 id="page-title">{date}</h1>
        </div>
        
        {filter!=='' ? todosToRender.map((todo)=><Todo key={todo.Todo} todo={todo} todos={todos} setTodos={setTodos}/>):
            todos.map((todo)=><Todo key={todo.Todo} todo={todo} todos={todos} setTodos={setTodos}/>)
        }

        <AddTodo todos={todos}/>

      </div>


    </div>
  );
}

export default App;

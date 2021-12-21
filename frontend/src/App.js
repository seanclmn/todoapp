import React, {useState,useEffect} from 'react'
import './App.css';

import Todo from './components/todo/Todo';
import SearchFilter from './components/searchfilter/SearchFilter';

function App() {


  // const todo = [
  //   {
  //   "ID": 1,
  //   "Original": "(A) 2021-02-05 Learn Go @hiring +periodic due:2021-02-12",
  //   "Todo": "Learn Goooo",
  //   "Priority": "A",
  //   "Projects": [
  //   "periodic"
  //   ],
  //   "Contexts": [
  //   "hiring"
  //   ],
  //   "AdditionalTags": {},
  //   "CreatedDate": "2021-02-05T00:00:00-05:00",
  //   "DueDate": "2021-02-12T00:00:00-05:00",
  //   "CompletedDate": "0001-01-01T00:00:00Z",
  //   "Completed": false
  //   },
  //   {
  //   "ID": 2,
  //   "Original": "(B) 2021-02-05 Implement CreateTodo @hiring +apichallenge due:2021-02-12",
  //   "Todo": "Implement CreateTodo",
  //   "Priority": "B",
  //   "Projects": [
  //   "apichallenge"
  //   ],
  //   "Contexts": [
  //   "hiring"
  //   ],
  //   "AdditionalTags": {},
  //   "CreatedDate": "2021-02-05T00:00:00-05:00",
  //   "DueDate": "2021-02-12T00:00:00-05:00",
  //   "CompletedDate": "0001-01-01T00:00:00Z",
  //   "Completed": false
  //   }
  //   ]
  const [json,setJson]=useState([{}])
  const [filter,setFilter]=useState('')
  const [searchCriteria,setSearchCriteria]=useState('')
  useEffect(()=>{
    fetch('http://localhost:8080/todos')
      .then((res)=>res.json())
      .then((res)=>setJson(res))
  },[])
  return (
    <div className="App">
      <SearchFilter filter={filter} setFilter={setFilter}/>

      {json.map((todo)=><Todo todo={todo} todos={json} setTodo={setJson}/>)}
    </div>
  );
}

export default App;

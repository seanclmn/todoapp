import React, {useEffect, useState} from 'react'
import './Todo.css'

import EditModal from '../editmodal/EditModal';

function Todo(props) {
    const [todo,setTodo]=useState(props.todo)
    const [title,setTitle]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [dueDateParsed,setDueDateParsed]=useState('')
    const [projects,setProjects]=useState([])
    const [contexts,setContexts]=useState([])


    const [loading,setLoading]=useState(true)    

    //Takes everything from props.todo and loads into state
    //Everytime todo is changed,this will run again  (i.e. when the update is done in the edit modal)
    useEffect(()=>{
        let dueDateParsed = new Date(todo.DueDate)
        setTitle(todo.Todo)
        setDueDate(todo.DueDate)
        setDueDateParsed(dueDateParsed.toLocaleString())
        setProjects(todo.Projects)
        setContexts(todo.Contexts)
        setLoading(false)

    },[todo])


    //modal toggle
    const [modalIsOpen,setIsOpen]=useState(false)

    function openModal() {
        setIsOpen(!modalIsOpen);
    }
    
    if(loading || !todo.Contexts ){
        return null
    } 


    return (
            <div className='todo-card'>            
                <header>
                    <h3 style={{lineHeight: "20px"}}>{todo.Todo} <span className='due-date-header'>(Due: {dueDateParsed})</span></h3> 
                    <div className='todo-icons-container'>
                        <img className="edit-button" onClick={openModal} src={process.env.PUBLIC_URL+'/icons/editing.png'}/>
                        <img className="close-todo-button" src={process.env.PUBLIC_URL+'/icons/close.png'}/>
                    </div>
                </header>
                <div className='items-list' key={'projects'}> <p>Projects: &nbsp;</p> {projects.map((project)=><p key={project}> {project} &nbsp; </p>)}</div>
                <div className='items-list' key={'Contexts'}><p>Contexts: &nbsp;</p> {contexts.map((context)=><p key={context}> {context} &nbsp; </p>)}</div>
                <EditModal key={todo.ID} id={todo.ID} todo={todo} setTodo={setTodo} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
            </div>
    )
}

export default Todo

import React, {useEffect, useState} from 'react'
import useMountedState from 'react-usemountedstate'
import ReactDOM from 'react-dom';

import TodoModal from '../todomodal/TodoModal';
import Tag from '../tag/Tag';
import './Todo.css'

import TestModal from '../editmodal/EditModal';

function Todo(props) {
    const todo=props.todo
    const [title,setTitle]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [projects,setProjects]=useState([])
    const [contexts,setContexts]=useState([])


    const [loading,setLoading]=useState(true)    

    useEffect(()=>{
        setTitle(todo.Todo)
        setDueDate(todo.DueDate)
        setProjects(todo.Projects)
        setContexts(todo.Contexts)
        setLoading(false)

    },[])

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
                <h3 style={{lineHeight: "0px"}}>{todo.Todo} (Due: {todo.DueDate})</h3> 
                <img className="edit-button" onClick={openModal} src={process.env.PUBLIC_URL+'/icons/editing.png'}/>
            </header>
            <div className='items-list' key={'projects'}> <p>Projects: &nbsp;</p> {projects.map((project)=><p key={project}> {project} </p>)}</div>
            <div className='items-list' key={'Contexts'}><p>Contexts: &nbsp;</p> {contexts.map((context)=><p key={context}> {context} </p>)}</div>
            
            <TestModal id={todo.ID} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default Todo

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './AddTodo.css'

import AddModal from '../addmodal/AddModal'

function AddTodo(props) {
    const todos=props.todos
    const [modalIsOpen,setIsOpen]=useState(false)

    function openModal() {
        setIsOpen(!modalIsOpen);
    }
    

    return (
        <button className='add-todo-container'>
            <img onClick={openModal} className="plus-icon" style={{height: '20px'}} src={process.env.PUBLIC_URL+'/icons/plus.png'}/>

            <p onClick={openModal} className='add-todo-text'>Add a Todo</p>
            <AddModal todos={todos} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
        </button>
    )
}



export default AddTodo

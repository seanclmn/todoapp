import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './AddTodo.css'

import AddModal from '../addmodal/AddModal'

function AddTodo() {

    const [modalIsOpen,setIsOpen]=useState(false)

    function openModal() {
        setIsOpen(!modalIsOpen);
    }
    

    return (
        <div className='add-todo-container' onClick={openModal}>
            <img className="plus-icon" style={{height: '20px'}} src={process.env.PUBLIC_URL+'/icons/plus.png'}/>

            <p style={{marginLeft: "20px"}}>Add a Todo</p>
            <AddModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}



export default AddTodo

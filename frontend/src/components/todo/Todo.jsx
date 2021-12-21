import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';

import Modal from 'react-modal'
import './Todo.css'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

function Todo(props) {
    let subtitle
    const todos=props.todos
    const todo=props.todo
    const setTodo = (newTodo)=>setTodo(newTodo)

    const [loading,setLoading]=useState(true)
    const [modalIsOpen,setIsOpen]=useState(false)


    useEffect(()=>{
        console.log("hello")
    })


    if(!todo.Contexts){
        return null
    } 

    function openModal() {
        setIsOpen(true);
    }
    
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    function SubmitHandler(event){
        event.preventDefault()
    }

    function test(){
        const newTodo = {
            ...todo,
            ['Todo']: 'todo',
          };


        const newTodos=[...todos]
        newTodos[todo.ID-1]=newTodo
        props.setTodo(newTodos)
        
    }

    
    return (
        <div className='todo-card'>
            <div>{todo.Todo}</div>
            <header>
                <h3>{todo.Todo} (Due: {todo.DueDate})</h3> 
            </header>
            {/* <div>{loading}</div> */}
            <button onClick={test}>button</button>

            <p>Projects: {todo.Projects.map((project)=>(project))}</p>
            <p>Contexts: {todo.Contexts.map((context)=>(context))}</p>
            
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                
                <button onClick={closeModal}>close</button>

                <form
                    className='todo-form'
                    onSubmit={SubmitHandler}
                    >

                    <div className='modal-todo-input'>
                            <label for='todo-input'>Todo:</label>
                            <input 
                                name='todo-input'
                                type='text'
                                defaultValue={todo.Todo}
                                placeholder='Input your todo here'
                            />
                    </div>

                    <div className='modal-todo-input'>
                            <label for='duedate-input'>Due Date:</label>
                            <input 
                                name='duedate-input'
                                type='text'
                                defaultValue={todo.DueDate}
                                placeholder='Input your due date here'
                            />
                    </div>

                    <div className='modal-todo-input'>
                            <label for='duedate-input'>Due Date:</label>
                            <input
                                name='duedate-input'
                                type='text'
                                defaultValue={todo.DueDate}
                                placeholder='Input your due date here'
                            />
                    </div>


                    <button onClick={SubmitHandler}>Update</button>
                </form>
            </Modal>
        </div>
    )
}

export default Todo

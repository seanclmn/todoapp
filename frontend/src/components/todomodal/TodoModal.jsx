import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';

import Modal from 'react-modal'
import Tag from '../tag/Tag';
import './TodoModal.css'


const customStyles = {
    content: {
        width: '500px',
        height: '500px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
  };

function TodoModal(props) {



    let subtitle

    const [title,setTitle]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [projects,setProjects]=useState([])
    const [contexts,setContexts]=useState([])


    const [loading,setLoading]=useState(true)    


    const [todo,setTodo]=useState([{}])

    useEffect(()=>{
        fetch(`http://localhost:8080/todo/${props.id}`)
          .then((res)=>res.json())
          .then((res)=>setTodo(res.data))
          .then(setLoading(false))
      },[])

    const modalIsOpen=props.modalIsOpen
    const setIsOpen=()=>props.setIsOpen()

    function openModal() {
        setIsOpen(true);
    }
    
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    
    function closeModal() {
        setIsOpen(false);
    }


    // function SubmitHandler(event){
    //     event.preventDefault()
    //     const newTodo = {
    //         ...todo,
    //         ['Todo']: title,
    //         ['DueDate']: dueDate,
    //         ['Projects']: projects,
    //         ['Contexts']: contexts,
    //       };


    //     const newTodos=[...todos]
    //     newTodos[todo.ID-1]=newTodo
    //     props.setTodo(newTodos)
        
    // }
    if(!todo.Contexts){
        return null
    } 


    return (

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
                    // onSubmit={SubmitHandler}
                    >

                    <div className='modal-todo-input'>
                            <label for='todo-input'>Todo:</label>
                            <input 
                                name='todo-input'
                                type='text'
                                defaultValue={todo.Todo}
                                placeholder='Input your todo here'
                                onChange={(event)=>{
                                    event.preventDefault()
                                    setTitle(event.target.value)}}
                            />
                    </div>

                    <div className='modal-todo-input'>
                            <label for='duedate-input'>Due Date:</label>
                            <input 
                                name='duedate-input'
                                type='text'
                                defaultValue={todo.DueDate}
                                placeholder='Input your due date here'
                                onChange={(event)=>{
                                    event.preventDefault()
                                    setDueDate(event.target.value)}}
                            />
                    </div>

                    <div className='modal-todo-input'>
                            {todo.Projects.map(project=>
                                <>
                                    <input
                                        key = {project}
                                        name='project-input'
                                        type='text'
                                        defaultValue={project}
                                        placeholder='Input your due date here'
                                        onChange={(event)=>{

                                            const newProjects = projects
                                            newProjects[todo.Projects.indexOf(project)]=event.target.value
                                            
                                            setProjects([...newProjects])
                                            }}
                                    />

                                </>
                                )}

                        <button> Add a new Project</button>
                                                        
                    </div>

                    <div className='modal-todo-input'>
                            {todo.Contexts.map(context=>
                                <>
                                    <input
                                        key = {context}
                                        name='context-input'
                                        type='text'
                                        defaultValue={context}
                                        placeholder='Input your due date here'
                                        onChange={(event)=>{

                                            const newContexts = contexts
                                            newContexts[todo.Contexts.indexOf(context)]=event.target.value
                                            
                                            setContexts([...newContexts])
                                            }}
                                    />

                                </>
                                )}

                        <button> Add a new Project</button>
                                                        
                    </div>




                    <button type='submit'>Update</button>
                </form>
            </Modal>
    )
}

export default TodoModal

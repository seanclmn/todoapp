import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';

import Modal from 'react-modal'
import './EditModal.css'


const customStyles = {
    content: {
        width: '450px',
        height: '500px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
    },
  };
  
function TestModal(props) {

    const [todo,setTodo]=useState({})
    const [title,setTitle]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [projects,setProjects]=useState([])
    const [contexts,setContexts]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        axios.get(`http://localhost:8080/todo/${props.id}`)
            .then((res)=>setTodo(res.data))
            .then(setLoading(false))


        setTitle(todo.Todo)
        setDueDate(todo.DueDate)
        setProjects(todo.Projects)
        setContexts(todo.Contexts)
      },[])

    let subtitle
    const modalIsOpen=props.modalIsOpen
    const setIsOpen=()=>props.setIsOpen()

    function afterOpenModal() {
        // subtitle.style.color = '#f00';
    }
    
    function closeModal() {
        setIsOpen(false);
    }



    function updateTodo(event){
        event.preventDefault()
        const newTodo = {
            ...todo,
            ['Todo']: title
          };
        
        console.log(newTodo)
        axios.put(`http://localhost:8080/todo/${props.id}`,newTodo)
            .catch((err)=> console.log(err))

        
    }

    Modal.setAppElement('#root')

    if(loading || !todo.Projects) return null

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Edit Modal"
            >
            <img className="close-button" onClick={closeModal} src={process.env.PUBLIC_URL+'/icons/close.png'}/>

            
                <form
                    className='todo-form'
                    onSubmit={updateTodo}
                    >

                    <div className='modal-todo-input'>
                            <label for='todo-input'>Todo</label>
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
                            <label for='duedate-input'>Due Date</label>
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
                        <label for='project-input'>Projects</label>
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

                    {/* <div className='modal-todo-input'>
                            {todo.Contexts.map(context=>
                                <>
                                    <input
                                        key = {context}
                                        name='context-input'
                                        type='text'
                                        defaultValue={context}
                                        placeholder='Input your due date here'
                                        // onChange={(event)=>{

                                        //     const newContexts = contexts
                                        //     newContexts[todo.Contexts.indexOf(context)]=event.target.value
                                            
                                        //     setContexts([...newContexts])
                                        //     }}
                                    />

                                </>
                                )}

                        <button> Add a new Project</button>
                                                        
                    </div> */}



                    <button className="submit-button" type='submit' onClick={updateTodo} >Update</button>
                </form>
        </Modal>
    )
}

export default TestModal

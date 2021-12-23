import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';

import Modal from 'react-modal'
import './TestModal.css'


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

    const [todo,setTodo]=useState(props.todo)
    const [title,setTitle]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [projects,setProjects]=useState([])
    const [contexts,setContexts]=useState([])
    const [loading,setLoading]=useState(false)
    


    const modalIsOpen=props.modalIsOpen
    const setIsOpen=(bool)=>props.setIsOpen(bool)

    Modal.setAppElement('#root')

    useEffect(()=>{

        setTitle(todo.Todo)
        setDueDate(todo.DueDate)
        setProjects(todo.Projects)
        setContexts(todo.Contexts)
        setLoading(false)
      },[])

    

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
            ['Todo']: title,
            ['DueDate']: dueDate,
            ['Projects']: projects,
            ['Contexts']: contexts,
          };
        
        console.log(newTodo)
        axios.put(`http://localhost:8080/todo/${props.id}`,newTodo)
            .catch((err)=> console.log(err))

    }


    //array functions


    //Projects

    function editProject(event,project){
        const newProjects = projects
        newProjects[projects.indexOf(project)]=event.target.value
        console.log(projects)
        setProjects([...newProjects])
    }
    function editContext(event,context){
        const newContexts = contexts
        newContexts[contexts.indexOf(context)]=event.target.value
        console.log(contexts)
        setContexts([...newContexts])
    }


    function addProject(event){
        event.preventDefault()
        setProjects([...projects, ''])

    }


    function addContext(event){
        event.preventDefault()
        setContexts([...contexts, ''])

    }


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
                    >

                    <div className='modal-todo-input'>
                            <label for='todo-input'>Todo</label>
                            <input 
                                name='todo-input'
                                type='text'
                                defaultValue={title}
                                placeholder='Input your todo here'
                                onChange={(event)=>{
                                    console.log(title)
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
                                    console.log(event.target.value)
                                    setDueDate(event.target.value)}}
                            />
                    </div>



                    <div className='modal-todo-input'>
                        <label for='project-input'>Projects</label>
                        {projects && projects.map(project=>
                                
                                <input
                                    key = {projects.indexOf(project)}
                                    name='project-input'
                                    type='text'
                                    defaultValue={project}
                                    placeholder='Input your new project here'
                                    onChange={(event)=>editProject(event,project)}
                                />

                            
                            )}

                        <button onClick={addProject}>
                             Add a new Project
                        </button>
                                                        
                    </div>

                    <div className='modal-todo-input'>
                            {contexts && contexts.map(context=>

                                <input
                                    key = {contexts.indexOf(context)}
                                    name='context-input'
                                    type='text'
                                    defaultValue={context}
                                    placeholder='Input your new context here'
                                    onChange={(event)=>editContext(event,context)}
                                />

                                )}

                        <button onClick={addContext}> 
                            Add a new Context
                        </button>
                                                        
                    </div>



                    <button className="submit-button" type='submit' onClick={updateTodo} >Update</button>
                </form>
        </Modal>
    )
}

export default TestModal

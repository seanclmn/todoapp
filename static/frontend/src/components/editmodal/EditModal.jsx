import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';

import Modal from 'react-modal'
import './EditModal.css'


//Biggest bug in this file is regarding keys for the projects and contexts. 
//After every change in the input, I am updating state, triggering a rerender. This rerender updates the keys, causing the inputs to lose focus.
//I can't think of a way to create a unique key for each project and context, which won't change after a change in state.
//One solution is to just not give a key, but doing this makes the delete project function and the delete context function fail, because keys are necessary for this to work.
//Without keys, deleting any project will just result in the last project disappearing from the component ¯\_(ツ)_/¯.

//Styling for modal. Some of this styling is from NPM's page for react-modal.
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
  
function EditModal(props) {

    //basic state variables are here
    const [todo,setTodo]=useState(props.todo)
    const [title,setTitle]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [projects,setProjects]=useState([])
    const [contexts,setContexts]=useState([])
    const [loading,setLoading]=useState(false)
    

    //modal state via props
    const modalIsOpen=props.modalIsOpen
    const setIsOpen=(bool)=>props.setIsOpen(bool)

    Modal.setAppElement('#root')


    //setting state with todo props
    useEffect(()=>{

        setTitle(todo.Todo)
        setDueDate(todo.DueDate)
        setProjects(todo.Projects)
        setContexts(todo.Contexts)
        setLoading(false)
      },[])
    

    //Some modal functions for react modal

    function afterOpenModal() {
    }
    
    function closeModal() {
        setTodo(props.todo)
        setIsOpen(false);
    }

    //Function for updating todo. Performs a put request to server, as well as rerender todo.jsx

    function updateTodo(event){
        event.preventDefault()
        const newTodo = {
            ...todo,
            ['Todo']: title,
            ['DueDate']: dueDate,
            ['Projects']: projects,
            ['Contexts']: contexts,
          };
        
        
        axios.put(`http://localhost:8080/todo/${props.id}`,newTodo)
            .catch((err)=> console.log(err))
            .then(props.setTodo(newTodo))
            .then(closeModal())



    }


    //Editing projects and contexts

    function editProject(event,project){
        event.preventDefault()
        const newProjects = projects
        newProjects[projects.indexOf(project)]=event.target.value
        console.log(projects)
        setProjects([...newProjects])
    }
    function editContext(event,context){
        event.preventDefault()
        const newContexts = contexts
        newContexts[contexts.indexOf(context)]=event.target.value
        console.log(newContexts)
        setContexts([...newContexts])
    }


    //Creating new projects and contexts
    function addProject(event){
        event.preventDefault()
        setProjects([...projects, ''])

    }


    function addContext(event){
        event.preventDefault()
        setContexts([...contexts, ''])

    }


    //Deleting new projects and contexts
    function deleteProject(event,index){
        event.preventDefault()
        if(projects.length>1){
            const newProjects = projects

            newProjects.splice(index, 1)
            setProjects([...newProjects])
        }
    }

    function deleteContext(event,index){
        event.preventDefault()
        if(contexts.length>1){
            const indexNow = index
            const newContexts = contexts
            if(indexNow===contexts.length-1){
                newContexts.pop()
            }else{
                newContexts.splice(indexNow, 1)
            }
            setContexts([...newContexts])

            
        }
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
                                className='todo-duedate-input'
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
                                className='todo-duedate-input'
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
                        {projects.length>0 && <label for='project-input'>Projects</label>}
                        {projects && projects.map(project=>
                            <div className='project-context' key = {Math.floor(100000 + Math.random() * 900000)}>
                                    <input
                                        className='project-context-input'
                                        name='project-input'
                                        type='text'
                                        defaultValue={project}
                                        placeholder='Input your new project here'
                                        onChange={(event)=>{
                                            editProject(event,project)
                                        
                                        }}
                                    />
                                <button className="delete-button"onClick={(event)=>{
                                        deleteProject(event,projects.indexOf(project))}}>
                                    {projects.length>1 && <img style={{width: "70%"}} src={process.env.PUBLIC_URL+'/icons/delete.png'}/>}
                                </button>
                            </div>
                        )}

                        <button className="submit-button" style={{backgroundColor: "#33B025"}} onClick={addProject}>
                             Add a new Project
                        </button>
                                                        
                    </div>

                    <div className='modal-todo-input'>
                        {contexts.length>0 && <label for='context-input'>Contexts</label>}
                        {contexts && contexts.map(context=>
                            <div className='project-context' key = {Math.floor(100000 + Math.random() * 900000)}
                            >
                                    <input
                                        className='project-context-input'
                                        name='context-input'
                                        type='text'
                                        defaultValue={context}
                                        placeholder='Input your new context here'
                                        onChange={(event)=>editContext(event,context)}
                                    />
                                <button className="delete-button" onClick={(event)=>deleteContext(event,contexts.indexOf(context))}>
                                    {contexts.length>1 && <img style={{width: "70%"}} src={process.env.PUBLIC_URL+'/icons/delete.png'}/>}
                                </button>
                            </div>
                        )}

                        <button className="submit-button" style={{backgroundColor: "#33B025"}} onClick={addContext}> 
                            Add a new Context
                        </button>
                                                        
                    </div>



                    <button className="submit-button" type='submit' onClick={updateTodo} >Update</button>
                </form>
        </Modal>
    )
}

export default EditModal

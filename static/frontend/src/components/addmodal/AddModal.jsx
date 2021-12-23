import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';

import Modal from 'react-modal'

// import './AddModal.css'

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

function AddModal(props) {

    const [todos,setTodos]=useState([{}])
    const [id,setId]=useState(0)
    const [title,setTitle]=useState('')
    const [priority,setPriority]=useState('')
    const [projects,setProjects]=useState([])
    const [contexts,setContexts]=useState([])
    const [additionalTags,setAdditionalTags]=useState({})
    const [createdDate, setCreatedDate]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [completedDate, setCompletedDate]=useState('')
    const [completed,setCompleted]=useState(false)
    const [loading,setLoading]=useState(true)
    const modalIsOpen=props.modalIsOpen
    const setIsOpen=(bool)=>props.setIsOpen(bool)
    let subtitle
    Modal.setAppElement('#root')

    useEffect(()=>{
        axios.get('http://localhost:8080/todos')
            .then((res)=>setTodos(res.data))
            .then(setLoading(false))
    },[])


    
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    
    function closeModal() {
        props.setIsOpen(false);
    }

    function addTodo(event){
        event.preventDefault()
        // const newTodo = {
        //     ...todo,
        //     ['Todo']: title,
        // }

        console.log(`http://localhost:8080/todo/${id}`)
        // axios.post(`http://localhost:8080/todo/${id}`,newTodo)
        //     .catch((err)=> console.log(err))

    }



    if(loading) return null
    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Add Modal"
            >
            <img className="close-button" onClick={closeModal} src={process.env.PUBLIC_URL+'/icons/close.png'}/>
            
                <form
                    className='todo-form'
                    >

                    <div className='modal-todo-input'>
                            <label for='todo-input'>Todo:</label>
                            <input 
                                name='todo-input'
                                type='text'
                                placeholder='Input your todo here'
                                onChange={(event)=>{
                                    event.preventDefault()
                                    setTitle(event.target.value)}}
                            />
                    </div>

                    <div className='modal-todo-input'>
                            {projects.map(project=>
                                <>
                                    <input
                                        key = {project}
                                        name='project-input'
                                        type='text'
                                        defaultValue={project}
                                        placeholder='Input your due date here'
                                        onChange={(event)=>{

                                            const newProjects = projects
                                            newProjects[projects.indexOf(project)]=event.target.value
                                            
                                            setProjects([...newProjects])
                                            }}
                                    />

                                </>
                                )}

                        <button onClick={(event)=>{
                            event.preventDefault()
                            console.log(projects)}}> Add a new Project</button>
                                                        
                    </div>


                    <button className="submit-button" type='submit' onClick={addTodo}>Add</button>
                </form>
        </Modal>
    )
}

export default AddModal

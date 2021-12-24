import React, {useState} from 'react'
import './SearchFilter.css'
function SearchFilter(props) {

    function handleChange(event){
        props.setFilter(event.target.value)
    }


    function filterToggle(event,string){
        event.preventDefault()
        props.setFilterToggle(string)
    }
    return (
        <div className='top-bar-container'>
            <form
                className="form"
                autoComplete="off"
                style={{width: '100%'}}
                >
                <div className='searchbar'>
                    <div className='search-icon-container'>
                        <img id="searchbar-icon" src={process.env.PUBLIC_URL+'/icons/search.png'}/>
                    </div>

                    <input 
                        id="input"
                        type="text"
        
                        onChange={handleChange}
                        placeholder="Search"
                    />

                    
                </div>
            </form>

            <select onChange={(event)=>filterToggle(event,event.target.value)}>
                <option value="projects">
                    Projects
                </option>

                <option value="contexts">
                    Contexts
                </option>

            </select>
    
            {/* <div className='filters-container'>
                <button 
                    className='filter-button'
                    onClick={dropdownSwitch}
                    >
                    Filter
                </button>
                {dropdown && 
                    <div className='dropdown' >
                        <div>Projects</div>
                        <div>Contexts</div>
                    </div>
                }
            </div> */}
        </div>
    )
}

export default SearchFilter

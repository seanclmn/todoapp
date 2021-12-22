import React, {useState} from 'react'
import './SearchFilter.css'
function SearchFilter(props) {

    function handleChange(event){
        props.setFilter()
    }

    return (
        <form
            id="form"
            autoComplete="off"
            >
            <div className='searchbar'>
                <img id="searchbar-icon" src={process.env.PUBLIC_URL+'/icons/search.png'}/>
                <input 
                    id="input"
                    type="text"
    
                    onChange={handleChange}
                    placeholder="Search by filter"
                />
            </div>
        </form>
    )
}

export default SearchFilter

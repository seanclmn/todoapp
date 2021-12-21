import React, {useState} from 'react'

function SearchFilter(props) {

    function handleChange(event){
        props.setFilter()
    }

    return (
        <form
            id="searchbar"
            autoComplete="off"
            >
            <input 
                id="input"
                type="text"
                name="name"
                onChange={handleChange}
                placeHolder="search by filter"
            />
        </form>
    )
}

export default SearchFilter

import React from 'react';


export default function SearchBox(props){
    return(
        <input
        type="search"
        placeholder="search"
        onChange={props.handlaChange}
        />
    )
}
import React from 'react'
import './styles.css'

const SearchPreviewCircle = (props) => {
    return (
        <button 
            id="search-preview-circle"
            onClick={() => props.handleSearch(props.nome)}
        >
            {props.codigo === "plus" && "+"}
            {props.nome}
        </button>
    )
}

export default SearchPreviewCircle
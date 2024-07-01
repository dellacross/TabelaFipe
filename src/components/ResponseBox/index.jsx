import React from 'react'
import './styles.css'

const ResponseBox = (props) => {
  return (
    <div 
        id="response-box"
        className={props.status?.codigo === 0 ? "error-response" : "success-response"}
    >
        {props.status?.msg}
    </div>
  )
}

export default ResponseBox
import React from 'react'

function Buttons(props) {
  return (
    <button 
      type={props.type} 
      disabled={props.disabled} 
      className={props.style}
    >
        <img 
          src={props.icon}
        />
        {props.text}
    </button>
  )
}

export default Buttons

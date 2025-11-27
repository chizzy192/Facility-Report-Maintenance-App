import React from 'react'

const Buttons = (props) => {
  return (
    <button 
      type={props.type} 
      disabled={props.disabled} 
      className={props.style}
      onClick={props.onClick}
    >
        {props.icon}
        {props.text}
    </button>
  )
}

export default Buttons

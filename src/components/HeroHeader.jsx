import React from 'react'

function HeroHeader(props) {
  return (
    <figure className="flex flex-row items-center">
        <div className={props.logoContainerStyle}> 
          {props.logo}
        </div>

        <figcaption className={props.textStyle}>
            {props.logoText}
        </figcaption>
    </figure>
  )
}

export default HeroHeader

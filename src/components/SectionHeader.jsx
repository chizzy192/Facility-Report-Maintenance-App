import React from 'react'

const SectionHeader = ({title='', text=''}) => {
  return (
    <div>
        <h1 className='text-text text-2xl 2xl:text-3xl font-bold'>{title}</h1>
        <p className='text-text-muted'>
            {text}
        </p>
    </div>
  )
}

export default SectionHeader

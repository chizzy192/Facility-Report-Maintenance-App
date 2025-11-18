import React from 'react'

function Catergory() {
  return (
                    <div className='w-full'>
                        <p className="py-1 px-2 text-sm transition-all duration-300 ease-in-out text-text">Category *</p>

                        <select
                        name="technicanCategory"
                         required 
                         className="bg-gray-100 dark:bg-gray-900 rounded-xl focus:rounded-xl flex p-2 hover:outline-3 outline-border text-text-muted shadow-sm items-center w-full">
                            <option value="" disabled selected hidden className="text-text-muted">Select a category</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="HVAC">HVAC</option>
                            <option value="Structural">Structural</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="Safety">Safety</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
  )
}

export default Catergory

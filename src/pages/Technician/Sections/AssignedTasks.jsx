import { CalendarIcon, Check, MapPinHouseIcon, X } from 'lucide-react'
import React from 'react'
import Buttons from '../../../components/Buttons'
import SectionHeader from '../../../components/SectionHeader'

function AssignedTasks() {
  return (
    <section className="flex flex-col gap-5">
        <SectionHeader
            title="Assigned Tasks"
            text="Review and accept new task assignments"
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>

            <div className="border-border/50 border bg-background-black rounded-2xl gap-3 shadow-md ">
                <img 
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
                    alt="" 
                    className="w-full h-40 rounded-tl-2xl rounded-tr-2xl "
                />

                <div className="m-5">
                    <div className="mb-3 flex flex-col w-auto">
                        <div className="flex flex-row mb-1 justify-between items-center">
                            <h2 className="text-text text-lg w-[70%]">
                                Broken AC in Conference Room
                            </h2>
                            <p className="bg-primary-dark/20 border-primary-dark border py-1 px-1 sm:px-2 rounded-2xl text-xs text-primary-dark">
                                In Progress
                            </p>
                        </div>

                        <div>
                        <p className='text-text-muted text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione enim dolorem dolor ea iure assumenda sint omnis? Culpa quae.
                        </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                    <p className="flex gap-2 items-center text-text-muted">
                        <span className="text-text-muted text-sm">
                            <MapPinHouseIcon className="text-text-muted w-4 h-4"/>
                        </span>
                        <span className="text-sm">Building A - Room 301</span>
                    </p>

                    <p className="flex gap-2 items-center">
                        <span className="text-text-muted text-sm">
                            <CalendarIcon className="text-text-muted w-4 h-4"/>
                        </span>
                        <span className="text-text-muted text-sm">2025-10-20</span>
                    </p>

                    <div className="border-border/50 border "></div>

                    <p className="flex justify-between items-center">
                        <span className="text-text-muted text-sm">Reported by:</span>
                        <span className="text-text">Chiziterem Eze</span>
                    </p>    
                    </div>
                </div>
                
                <div className='mx-5 mb-5 flex justify-between gap-3'>
                    <Buttons 
                        type='submit'
                        style='cursor-pointer bg-primary-dark hover:bg-primary-dark/50 text-white flex gap-2 w-full items-center justify-center p-1.5 text-sm shadow-sm rounded-sm' 
                        text='Accept'
                        icon = {<Check className='w-4 h-4'/>}
                    />
                        
                    <Buttons 
                        type='submit'
                        style='cursor-pointer border-border border text-text flex gap-2 w-full items-center justify-center p-1.5 text-sm shadow-sm rounded-sm' 
                        text='Decline'
                        icon = {<X className='w-4 h-4'/>}
                    />
                </div>
            </div>
        

            <div className="border-border/50 border bg-background-black rounded-2xl gap-3 shadow-md ">
                <div className="m-5">
                    <div className="mb-3 flex flex-col w-auto">
                        <div className="flex flex-row mb-1 justify-between items-center">
                            <h2 className="text-text text-lg w-[70%]">
                                Broken AC in Conference Room
                            </h2>
                            <p className="bg-primary-dark/20 border-primary-dark border py-1 px-1 sm:px-2 rounded-2xl text-xs text-primary-dark">
                                In Progress
                            </p>
                        </div>

                        <div>
                        <p className='text-text-muted text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione enim dolorem dolor ea iure assumenda sint omnis? Culpa quae.
                        </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                    <p className="flex gap-2 items-center text-text-muted">
                        <span className="text-text-muted text-sm">
                            <MapPinHouseIcon className="text-text-muted w-4 h-4"/>
                        </span>
                        <span className="text-sm">Building A - Room 301</span>
                    </p>

                    <p className="flex gap-2 items-center">
                        <span className="text-text-muted text-sm">
                            <CalendarIcon className="text-text-muted w-4 h-4"/>
                        </span>
                        <span className="text-text-muted text-sm">2025-10-20</span>
                    </p>

                    <div className="border-border/50 border "></div>

                    <p className="flex justify-between items-center">
                        <span className="text-text-muted text-sm">Reported by:</span>
                        <span className="text-text">Chiziterem Eze</span>
                    </p>    
                    </div>
                </div>
                
                <div className='mx-5 mb-5 flex justify-between gap-3'>
                    <Buttons 
                        type='submit'
                        style='cursor-pointer bg-primary-dark hover:bg-primary-dark/50 text-white flex gap-2 w-full items-center justify-center p-1.5 text-sm shadow-sm rounded-sm' 
                        text='Accept'
                        icon = {<Check className='w-4 h-4'/>}
                    />
                        
                    <Buttons 
                        type='submit'
                        style='cursor-pointer border-border border text-text flex gap-2 w-full items-center justify-center p-1.5 text-sm shadow-sm rounded-sm' 
                        text='Decline'
                        icon = {<X className='w-4 h-4'/>}
                    />
                </div>
            </div>
        </div>

        
    </section>
  )
}

export default AssignedTasks

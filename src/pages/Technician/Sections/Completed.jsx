import { CalendarIcon, Check, MapPinHouseIcon, User, X } from 'lucide-react'
import SectionHeader from '../../../components/SectionHeader'

function Completed() {
  return (
    <section className="flex flex-col gap-5">
        <SectionHeader
            title='Completed Tasks'
            text='Your task history and resolved issues'
        />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
            <div className="p-5 shadow-lg rounded-lg bg-background-black border-border/50 border">
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
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3 wrap-break-word">

                    <p className="flex gap-1 items-center text-text-muted whitespace-nowrap">
                        <MapPinHouseIcon className="text-text-muted w-4 h-4"/>
                        <span className="text-sm">Building A - Room 301</span>
                    </p>

                    <p className="flex gap-1 items-center whitespace-nowrap">
                        <CalendarIcon className="text-text-muted w-4 h-4"/>
                        <span className="text-text-muted text-sm">2025-10-20</span>
                    </p>

                    <p className="flex gap-1 items-center whitespace-nowrap">
                        <User className="text-text-muted w-4 h-4 "/>
                        <span className="text-text-muted text-sm">Reported by <span >Chiziterem Eze</span></span>
                        
                    </p>    
                </div>
            </div>

            <div className="p-5 shadow-lg rounded-lg bg-background-black border-border/50 border">
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
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3 wrap-break-word">

                    <p className="flex gap-1 items-center text-text-muted whitespace-nowrap">
                        <MapPinHouseIcon className="text-text-muted w-4 h-4"/>
                        <span className="text-sm">Building A - Room 301</span>
                    </p>

                    <p className="flex gap-1 items-center whitespace-nowrap">
                        <CalendarIcon className="text-text-muted w-4 h-4"/>
                        <span className="text-text-muted text-sm">2025-10-20</span>
                    </p>

                    <p className="flex gap-1 items-center whitespace-nowrap">
                        <User className="text-text-muted w-4 h-4 "/>
                        <span className="text-text-muted text-sm">Reported by <span >Chiziterem Eze</span></span>
                        
                    </p>    
                </div>
            </div>
        </div>      
    </section>
  )
}

export default Completed

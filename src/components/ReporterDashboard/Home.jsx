import { CalendarIcon, MapPinHouseIcon } from "lucide-react"

const variants = {
    'pending': {
      bg: 'bg-yellow-500/10 dark:bg-yellow-500/20',
      text: 'text-yellow-600 dark:text-yellow-400',
      dot: 'bg-yellow-500',
      label: 'Pending'
    },
    'waiting-approval': {
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      dot: 'bg-blue-500',
      label: 'Waiting for Approval'
    },
    'in-progress': {
      bg: 'bg-orange-500/10 dark:bg-orange-500/20',
      text: 'text-orange-600 dark:text-orange-400',
      dot: 'bg-orange-500',
      label: 'In Progress'
    },
    'awaiting-confirmation': {
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
      dot: 'bg-purple-500',
      label: 'Awaiting Confirmation'
    },
    'fixed': {
      bg: 'bg-green-500/10 dark:bg-green-500/20',
      text: 'text-green-600 dark:text-green-400',
      dot: 'bg-green-500',
      label: 'Fixed'
    },
    'unassigned': {
      bg: 'bg-gray-500/10 dark:bg-gray-500/20',
      text: 'text-gray-600 dark:text-gray-400',
      dot: 'bg-gray-500',
      label: 'Unassigned'
    }
  }

function Home() {
  return (
    <section className="flex flex-col gap-5">
      <div>
        <h1 className='text-text text-2xl 2xl:text-3xl font-bold'>All Reports</h1>
        <p className='text-text-muted'>
          View all active facility reports
        </p>
      </div>
        {/* my card */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      
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
                      <span className="text-text-muted text-sm">Reported By:</span>
                      <span className="text-text">Tochukwu Obi</span>
                  </p>

                  <p className="flex justify-between items-center">
                      <span className="text-text-muted text-sm">Assigned to:</span>
                      <span className="text-text">John Smith</span>
                  </p>    
                </div>
            </div>
        </div>

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
                      <span className="text-text-muted text-sm">Reported By:</span>
                      <span className="text-text">Tochukwu Obi</span>
                  </p>

                  <p className="flex justify-between items-center">
                      <span className="text-text-muted text-sm">Assigned to:</span>
                      <span className="text-text">John Smith</span>
                  </p>    
                </div>
            </div>
        </div>

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
                      <span className="text-text-muted text-sm">Reported By:</span>
                      <span className="text-text">Tochukwu Obi</span>
                  </p>

                  <p className="flex justify-between items-center">
                      <span className="text-text-muted text-sm">Assigned to:</span>
                      <span className="text-text">John Smith</span>
                  </p>    
                </div>
            </div>
        </div>

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
                      <span className="text-text-muted text-sm">Reported By:</span>
                      <span className="text-text">Tochukwu Obi</span>
                  </p>

                  <p className="flex justify-between items-center">
                      <span className="text-text-muted text-sm">Assigned to:</span>
                      <span className="text-text">John Smith</span>
                  </p>    
                </div>
            </div>
        </div>

        {/* <div className="border-border border p-6 bg-background-black rounded-xl shadow-md flex flex-col">
            <div className="mb-3">
                <div className="flex flex-row mb-1 justify-between items-center">
                    <h2 className="text-text text-lg  lg:text-xl w-[70%]">
                        Broken AC in Conference Room
                    </h2>
                    <p className="border-warning bg-warning/20 border py-1 px-1 sm:px-2 rounded-2xl text-xs text-warning">
                        Pending
                    </p>
                </div> 
                <p className="text-text-muted">
                    Air conditioning unit not working
                </p>
            </div> 
            <div className="flex flex-col gap-3">
                <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm ">Location:</span>
                    <span className="text-text">Building A - Room 301</span>
                </p>

                <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Priority:</span>
                    <span className="bg-yellow-500/20 border-yellow  border py-0.5 text-center px-2.5 rounded-2xl text-xs text-orange-500">medium</span>
                </p>

                <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Date:</span>
                    <span className="text-text">2025-10-20</span>
                </p>

                <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Assigned to:</span>
                    <span className="text-text">John Smith</span>
                </p>
            </div>
                        <div className="flex justify-between items-center gap-3 m-6">
                <button className="flex gap-2 bg-background px-3 py-1 justify-center items-center w-full border-border border rounded-md cursor-pointer text-primary-dark hover:text-primary-dark/50 shadow-md">
                    <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                    </svg>

                    <span>Edit</span>
                </button>
                <button className="flex gap-2 bg-background px-3 py-1 items-center justify-center w-full border-border border rounded-md cursor-pointer text-error hover:text-error/50 shadow-md">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>

                    <span className="">Delete</span>
                </button>
            </div>
        </div>

        <div className="border-border border p-6 bg-background-black rounded-xl shadow-md flex flex-col">
            <div className="mb-3">
                <div className="flex flex-row mb-1 justify-between items-center">
                    <h2 className="text-text text-lg  lg:text-xl w-[70%]">
                        Broken AC in Conference Room
                    </h2>
                    <p className="bg-success/20 border-success border py-1 px-1 sm:px-2 rounded-2xl text-xs text-success">
                        Resolved
                    </p>
                </div> 
                <p className="text-text-muted">
                    Air conditioning unit not working
                </p>
            </div> 
            <div className="flex flex-col gap-3">
                <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm ">Location:</span>
                    <span className="text-text">Building A - Room 301</span>
                </p>

                <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Priority:</span>
                    <span className="text-text-muted bg-border/20 border-border border py-0.5 text-center px-2.5 rounded-2xl text-xs">Low</span>
                </p>

                <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Date:</span>
                    <span className="text-text">2025-10-20</span>
                </p>

                <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Assigned to:</span>
                    <span className="text-text">John Smith</span>
                </p>
            </div>
        </div> */}
      </div>
    </section>
  )
}

export default Home

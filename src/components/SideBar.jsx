import {useEffect, useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router'
import Theme from './Theme.jsx'
import { supabase } from '../supabaseClient.js'
import { FileSpreadsheet } from 'lucide-react'
import { UserAuth } from '../context/AuthContext.jsx'

const SideBar = ({text='text', links = []}) => {
  const {signOutUser, user} = UserAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  

  const sidebarRef = useRef(null);
  const isMobile = window.innerWidth < 1024;
  const navigate = useNavigate();
  

  const handleSignOut = async (e) => {
    e.preventDefault();
    
    const result = await signOutUser();

    try {
      await signOutUser();
      navigate('/');  
    } catch (err) {
      console.error("sign out failed:", err);
    }
  }



  useEffect (() => {
    function handleClickOutside(e) {
      if(isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }    
    }

    window.addEventListener('click', handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [isOpen]);


  return (
    <header className='relative top-0 left-0 h-fulltransform transition-transform duration-300 ease-in-out z-10 border-border/50 border shadow-md hover:lg:w-68 lg:w-21'>
      <button onClick={(e) => {
    e.stopPropagation(); 
    setIsOpen(!isOpen);}} className={` p-1 m-5 bg-background-black rounded-lg border-border shadow-lg border absolute top-0 left-0 w-auto justify-center items-center lg:hidden cursor-pointer`}>
        {!isOpen && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide flex js-menu bg-background text-text lucide-menu h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
        )}
    </button>

    <aside 
      ref={sidebarRef} onClick={(e) => e.stopPropagation()}  
      onMouseEnter={() => !isMobile && setIsHovered(true)} 
      onMouseLeave={() => !isMobile && setIsHovered(false)} 
      className={`fixed top-0 left-0 h-full w-68 bg-surface lg:bg-surface/50 text-white transform transition-transform duration-300 ease-in-out z-10 shadow-md hover:w-68 lg:w-21
          ${isHovered ? "translate-x-0" : "lg:translate-0"} 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="items-center w-auto absolute right-0 cursor-pointer p-4 flex justify-end lg:hidden"
        >
          {isOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide js-close lucide-x h-6 w-6 text-text"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          )}
        </button>

        <nav className={`flex flex-col space-y-2 justify-between w-auto h-full text-text lg:static  `} >
          
        
          <div className='flex flex-col w-full'>
            <figure className="flex flex-row items-center border-b border-border/50 p-5">
              <div className='bg-primary-dark p-2 rounded-xl '> 
                <FileSpreadsheet className='text-white w-7 h-7'/>
              </div>

                <figcaption className={`ml-4 flex-col justify-center ${isHovered ? 'flex' : 'lg:hidden'}`}>
                  <h2>
                    FacilityFix
                  </h2>
                  <p className='text-text-muted text-sm'>
                    {text}
                  </p>
              </figcaption>
            </figure>

            {links.length > 0 ? (
                links.map((link, i) => (
                  <Link
                    key={i}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`hover:bg-primary-dark/20  p-2.5 mx-4 my-1 rounded-lg transition flex active:text-primary-dark focus:text-primary-dark text-text-muted ${!isHovered && !isMobile ? 'justify-center' : 'justify-start'}`}
                  >
                    {link.logo}
                    <p className={`ml-3 ${isHovered ? 'flex' : 'lg:hidden'}`}>{link.label}</p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No links available</p>
              )}
          </div>

          <div className='w-full flex flex-col px-5 my-2 gap-3'>
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-3xl bg-primary-dark items-center flex justify-center text-2xl text-white'>C</div>
              <h4 className={`ml-3 ${isHovered ? 'flex' : 'lg:hidden'}`}>{user?.user_metadata?.full_name || "Loading..."}</h4>
            </div>

            {(isHovered || isOpen) ? (<Theme style='p-2 bg-background-black/50 rounded-lg border-border/50 shadow-lg border w-full  flex justify-start items-center cursor-pointer' showText='true'/>) : <Theme style='p-2 bg-background-black/50 rounded-lg border-border/50 shadow-lg border w-full flex justify-start items-center cursor-pointer'/>}
              
            <button className='p-2 bg-background-black/50 rounded-lg border-border/50 shadow-lg border w-full flex justify-start items-center cursor-pointer text-error' onClick={handleSignOut}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24"   height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out h-5 w-5 text-error"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                <h3 className={`text-error text-md ${isHovered ? "flex" : 'lg:hidden'}  ml-4`}>Logout</h3>
            </button>
          </div>         
        </nav> 
    </aside>
    </header>
  )
}

export default SideBar


import Buttons from './Buttons.jsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router';

function MenuBar() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden cursor-pointer">
        {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide js-close lucide-x h-6 w-6 bg-background text-text"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>

            
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide flex js-menu bg-background text-text lucide-menu h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
        )}
    </button>

    {/* <!-- tablet  and desltop view --> */}
    <div className="hidden md:flex flex-row space-x-2 justify-center items-center text-text w-auto">
        <Link to="/login">
            <Buttons
            style = "hover:border-b hover:border-border text-text justify-start h-auto flex text-text px-6 py-2 cursor-pointer"

            text = "Login"
            />
        </Link>
        <Link to="/signup">
            <Buttons
                style = "text-text border-primary mx-auto bg-primary-dark hover:bg-primary text-white h-auto flex justify-center items-center px-6 py-2 rounded-lg cursor-pointer"

                text = "Get Started"
                />
        </Link>
    </div>

        {/* <!-- mobile view --> */}
        {isOpen && (
            
            <div className="absolute top-16 left-0 w-full flex-col space-y-2 justify-center  items-start px-5 text-text md:hidden border-border border-b py-3 shadow-md bg-background">
                <Link to="/login">
                    <Buttons 
                    style = "w-auto text-text rounded-xl h-full flex text-text px-6 py-2  cursor-pointer font-bold"

                    text = "Login"
                />
                </Link>

                <Link to="/signup">
                    <Buttons 
                        style = "border-primary w-full mx-auto rounded-lg bg-primary-dark hover:bg-primary text-white h-full flex  justify-center items-center px-6 py-2 cursor-pointer font-bold"

                        text = "Get Started"
                    />
                </Link>
                
            </div>
        )}    
      
    </>
  );
}

export default MenuBar

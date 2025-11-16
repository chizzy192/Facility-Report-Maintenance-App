import React, {useState, useEffect} from 'react'
import darkmode from '../assets/darkmode.svg'
import lightmode from '../assets/lightmode.svg'


function Theme({showText = false, style=''}) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");

        if(savedTheme) {
            return savedTheme === "dark";
        } else {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
    });

    useEffect(() => {
        const root = document.documentElement;

        if(darkMode) {
            root.classList.add("dark");
            root.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            root.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode])
    
  return (
      <button 
        className={style}
        onClick={() => {
            setDarkMode(!darkMode);
        }}>

            <img 
                src={darkMode? lightmode : darkmode} 
                alt="" 
                className='w-8 h-6'
            />

            {showText && (
                <p className='ml-3'>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </p>
            )}
        </button>
  )
}

export default Theme

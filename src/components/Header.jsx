import Theme from './Theme.jsx'
import MenuBar from './MenuBar.jsx'
import HeroHeader from './HeroHeader.jsx'

function Header() {
    return (
      <>
          <header className="fixed bg-background h-auto w-full shadow-sm">
              <nav className="flex px-5 md:px-10 flex-row h-18 justify-between items-center w-full border-b border-border">
              {/* <!-- logo and heading name --> */}
                  <HeroHeader 
                    logo = {<svg className=" w-8 h-6 text-primary-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20v-9l-4 1.125V20h4Zm0 0h8m-8 0V6.66667M16 20v-9l4 1.125V20h-4Zm0 0V6.66667M18 8l-6-4-6 4m5 1h2m-2 3h2"/>
                    </svg>}

                    textStyle = "text-text text-md"
                    logoText = "FacilityFix"
                  
                  />

                  <div className="flex flex-row justify-between items-center w-auto h-full gap-3">
                      {/* <!-- theme modes --> */}
                      <Theme style='flex item-center cursor-pointer py-1'/>
                      {/* <!-- menu bar --> */}
                      <MenuBar />    
                  </div>
              </nav>  
          </header>
      </>
    )
}

export default Header

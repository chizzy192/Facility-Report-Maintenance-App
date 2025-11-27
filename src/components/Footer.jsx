import HeroHeader from "./HeroHeader"
function Footer() {

  return (
    <footer className="border-t border-border bg-background px-5 md:px-10 py-8">
        <div>
            <HeroHeader 
                logo = {<svg className=" w-8 h-6 text-primary-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20v-9l-4 1.125V20h4Zm0 0h8m-8 0V6.66667M16 20v-9l4 1.125V20h-4Zm0 0V6.66667M18 8l-6-4-6 4m5 1h2m-2 3h2"/>
                </svg>}

                textStyle = "text-text-muted text-md"
                logoText = "FacilityFix"
                
            />
            <p className="text-text-muted">
                Modern facility maintenance management for educational institutions.
            </p>
        </div>
        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-sm sm:text-base text-text-muted">© 2025 FacilityFix. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer

import Buttons from '../components/Buttons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router'
import reportIcon from '../assets/reportIcon.svg'
import trackingIcon from '../assets/trackingIcon.svg'
import efficientManagement from '../assets/efficientManagement.svg'

const cards = [{
    title: "Easy Reporting",
    description: "Submit maintenance requests with photos and descriptions in seconds",
    icon: reportIcon,
    style: "p-5",
  },
  { 
    title: "Real-time Tracking",
    description: "Monitor the status of your requests from submission to resolution",
    icon: trackingIcon,
    style: "p-5",
  },{
    title: "Efficient Management",
    description:"Assign tasks to technicians and track completion rates",
    icon: efficientManagement,
    style: "sm:col-span-2 lg:col-span-1 py-5 px-10"
}]

function LandingPage() {
  return (
    <>
      <Header />
      <main className='px-6 md:px-13 py-26'>
        <section className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  sm:pt-24 lg:pt-32">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-text mb-4 sm:mb-6 px-4 text-center">
            Report Maintenance Issues Easily
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-text-muted max-w-2xl mx-auto mb-8 sm:mb-12 px-4 text-center">
            Streamline your facility maintenance workflow. Submit reports, track progress, and manage tasks all in one place. Built for schools and institutions.
          </p>

          <div className="max-sm:space-y-5 w-full flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center mb-12 sm:mb-20 px-4 sm:justify-center">

            <Link className='border-primary w-auto rounded-lg shadow-md bg-primary-dark hover:bg-primary text-white h-full flex  justify-center items-center px-6 sm:px-7 py-2 sm:py-3 cursor-pointer font-bold' to="/signup">
              <Buttons
                text= "Get Started Free"
              />
            </Link>

            <Link className='text-text border-2 border-primary shadow-md w-auto h-full flex justify-center items-center px-6 sm:px-7 py-2 sm:py-3 rounded-lg cursor-pointer  font-bold' to="/login">
              <Buttons 
              text="Sign In"
            />
            </Link>
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-auto justify-center items-center">
        {/* Description Cards */}
        {cards.map((card, i) => (
            <div className={`flex flex-col shadow-md bg-surface/50 gap-3 w-full lg:w-auto h-auto justify-center items-center border-border border-2 rounded-2xl ${card.style}`} key={i}>

                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <img src={card.icon} alt="" />
                </div>
                <h3 className="text-lg sm:text-xl text-text mb-2">
                {card.title}
                </h3>
                <p className="text-sm sm:text-base text-center text-text-muted">
                    {card.description}
                </p> 
            </div>
            
          ))}    
        </section>
      </main>
      <Footer />

    </>
  )
}

export default LandingPage

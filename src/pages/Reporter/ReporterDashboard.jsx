import SideBar from '../../components/SideBar.jsx'
import { Outlet } from 'react-router'
import { Bell, CircleX, FileSpreadsheet, House, ClipboardList } from 'lucide-react'

function ReporterDashboard() {

    const dashboardLinks = [{
        label: "Home",
        to: "",
        logo: <House/>
    }, {
        label: "My Reports",
        to: "myreports",
        logo: <FileSpreadsheet/>
    }, {
        label: "Submit Report",
        to: "submitreport",
        logo: <CircleX />
    }, {
        label: "Notifications",
        to: "notifications",
        logo: <Bell />
    }]

  return (
    <div className='bg-background flex h-screen'>
        <SideBar
            text = 'reporter'
            links = {dashboardLinks}  
        />
        <main className='px-4 flex-1 overflow-y-auto md:px-8 lg:px-12 2xl:px-24 py-14 lg:py-10'>
            <Outlet />
        </main>
    </div>
  )
}

export default ReporterDashboard

import SideBar from '../../components/SideBar'
import { Outlet } from 'react-router'
import { Clipboard, CircleCheckBig, Users, FileSpreadsheet, Bell, Settings } from 'lucide-react'


function TechnicianDashboard() {
    const dashboardLinks = [{
        label: "Assigned Tasks",
        to: "",
        logo: <Clipboard/>
    }, {
        label: "In Progress",
        to: "inprogress",
        logo: <FileSpreadsheet />
    }, {
        label: "Completed",
        to: "completed",
        logo: <CircleCheckBig />
    }, {
        label: "Notifications",
        to: "notifications",
        logo: <Bell />
    }]

    return (
        <div className='bg-background flex h-screen'>
            <SideBar
                text = 'Technician'
                links = {dashboardLinks}  
            />
            <main className='px-4 flex-1 overflow-y-auto md:px-8 lg:px-12 2xl:px-24 py-14 lg:py-10'>
                <Outlet />
            </main>
        </div>
    )
}

export default TechnicianDashboard

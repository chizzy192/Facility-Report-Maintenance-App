import SideBar from '../components/SideBar.jsx'
import reporterlogo from '../assets/reporterlogo.svg'
import { Outlet } from 'react-router'
import { supabase } from '../subabaseClient.js'
import { useState, useEffect } from 'react'
import { Bell, CircleX, FileSpreadsheet, House } from 'lucide-react'

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

    const [user, setUser] = useState(null);

    useEffect(() => {
    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    getUser();
    }, [])

  return (
    <div className='bg-background flex h-screen'>
        <SideBar
            headerLogo = {reporterlogo}
            title = 'FacilityFix'
            text = 'reporter dashboard'
            links = {dashboardLinks}
            username= {user?.user_metadata?.full_name || "Loading..."}
        />
        <main className='px-4 flex-1 overflow-y-auto md:px-8 lg:px-12 2xl:px-24 py-14 lg:py-10'>
            <Outlet />
        </main>
    </div>
  )
}

export default ReporterDashboard

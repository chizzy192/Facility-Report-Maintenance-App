import SideBar from '../../components/SideBar'
import { Outlet } from 'react-router'
import { FileSpreadsheet, Users, FolderClosed, Bell, Settings } from 'lucide-react'

function AdminDashboard() {
      const dashboardLinks = [{
        label: "Reports",
        to: "",
        logo: <FileSpreadsheet/>
    }, {
        label: "Users",
        to: "users",
        logo: <Users/>
    }, {
        label: "Categories",
        to: "categories",
        logo: <FolderClosed />
    }, {
        label: "Notifications",
        to: "notifications",
        logo: <Bell />
    }, {
        label: "Settings",
        to: "settings",
        logo: <Settings />
    }]
    return (
      <div className='bg-background flex h-screen'>
          <SideBar
            text = 'Admin'
            links = {dashboardLinks} 
          />
          <main className='px-4 flex-1 overflow-y-auto md:px-8 lg:px-12 2xl:px-24 py-14 lg:py-10'>
              <Outlet />
          </main>
      </div>
    )
}

export default AdminDashboard

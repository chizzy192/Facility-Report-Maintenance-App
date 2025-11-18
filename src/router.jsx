import { createBrowserRouter } from "react-router"
import App from "./App"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

import ReporterDashboard from "./pages/Reporter/ReporterDashboard"
import MyReports from "./pages/Reporter/Sections/MyReports"
import SubmitReport from "./pages/Reporter/Sections/SubmitReport"
import Notifications from "./pages/Reporter/Sections/Notifications"
import Home from "./pages/Reporter/Sections/Home"

import AdminDashboard from "./pages/Admin/AdminDashboard"
import Reports from './pages/Admin/Sections/Reports'
import Users from './pages/Admin/Sections/Users'
import Categories from './pages/Admin/Sections/Categories'
import AdminNotifications from "./pages/Admin/Sections/AdminNotifications"
import Settings from "./pages/Admin/Sections/Settings"

import TechnicanDashboard from "./pages/Technician/TechnicianDashboard"
import AssignedTasks from "./pages/Technician/Sections/AssignedTasks"
import InProgress from "./pages/Technician/Sections/InProgress"
import Completed from "./pages/Technician/Sections/Completed"
import TechnicianNotification from "./pages/Technician/Sections/TechnicianNotification"

export const router = createBrowserRouter ([
    {path: "/", element: <App/>},
    { path: '/signup', element: <SignUp />},
    { path: '/login', element: <Login />},
    {
        path: "/reporterdashboard",
        element: <ReporterDashboard />,
        children: [
            { path: "", element: <Home /> },
            { path: "myreports", element: <MyReports /> },
            { path: "submitreport", element: <SubmitReport /> },
            {path: "notifications", element: <Notifications />}
        ],
    },
    { 
        path: '/admindashboard', 
        element: <AdminDashboard />,
        children: [
            { path: '', element: <Reports/>},
            { path: 'users', element: <Users/>},
            { path: 'categories', element: <Categories/>},
            { path: 'notifications', element: <AdminNotifications/>},
            { path: 'settings', element: <Settings/>}
        ]
    },
    {
        path: '/technicandashboard',
        element: <TechnicanDashboard />,
        children: [
            { path: '', element: <AssignedTasks/> },
            { path: 'inprogress', element: <InProgress/> },
            { path: 'completed', element: <Completed/> },
            { path: 'notifications', element: <TechnicianNotification/> }
        ]
    }
])
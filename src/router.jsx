import { createBrowserRouter } from "react-router"
import App from "./App"
import Login from "./pages/Login"
import ReporterDashboard from "./pages/ReporterDashboard"
import MyReports from "./components/ReporterDashboard/MyReports"
import SubmitReport from "./components/ReporterDashboard/SubmitReport"
import Notifications from "./components/ReporterDashboard/Notifications"
import Home from "./components/ReporterDashboard/Home"
import SignUp from "./pages/SignUp"

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
])
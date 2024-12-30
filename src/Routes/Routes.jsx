import { createBrowserRouter } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import App from "../App";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import StudentList from "../components/students/StudentList";
import AddStudent from "../components/students/AddStudent";
import Dashboard from "../components/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
        {
            path:"/register",
            element:<Register /> 
        },
        {
            path:"/login",
             element:<Login /> 
        },
        {
            path:"/",
            element:
              <ProtectedRoute>
                <DashboardLayout>
                <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
        },
        {
            path:"/students",
            element:
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentList/>
                </DashboardLayout>
              </ProtectedRoute>
        },
        {
            path:"/add-student",
            element:
              <ProtectedRoute>
                <DashboardLayout>
                <AddStudent />
                </DashboardLayout>
              </ProtectedRoute>
        }
    ]
  }
]);
export default router;

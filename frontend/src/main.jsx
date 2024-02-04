import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import NotFound from "./components/NotFound.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import EmployeesScreen from "./screens/EmployeesScreen.jsx";
import DepartmentScreen from "./screens/DepartmentScreen.jsx";
import ProjectScreen from "./screens/ProjectScreen.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ManagerDashboard from "./pages/ManagerDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import Logout from "./Utils/Logout.jsx";
import Login from "./screens/LoginScreen.jsx";
import ManageTimesheets from "./screens/ManageTimesheetsScreen.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<NotFound />}>
      <Route index={true} path="/" element={<Login />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/employees" element={<EmployeesScreen />} />
        <Route path="/department" element={<DepartmentScreen />} />
        <Route path="/projects" element={<ProjectScreen />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/manageTimesheets" element={<ManageTimesheets />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

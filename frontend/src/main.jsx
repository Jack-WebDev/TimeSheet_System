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

import HomeScreen from "./screens/HomeScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import EmployeesScreen from "./screens/EmployeesScreen.jsx";
import DepartmentScreen from "./screens/DepartmentScreen.jsx";
import ProjectScreen from "./screens/ProjectScreen.jsx";
import TimePeriodScreen from "./screens/TimePeriodScreen.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ManagerDashboard from "./pages/ManagerDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import Logout from "./components/Logout.jsx";
import Login from "./screens/Login.jsx";
import ManageTimesheets from "./screens/ManageTimesheets.jsx";
import ReportScreen from "./screens/ReportScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/manageTimesheets" element={<ManageTimesheets />} />

      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/employees" element={<EmployeesScreen />} />
      <Route path="/department" element={<DepartmentScreen />} />
      <Route path="/projects" element={<ProjectScreen />} />
      <Route path="/timeperiods" element={<TimePeriodScreen />} />
      <Route path="/report" element={<ReportScreen />} />
      <Route path="/logout" element={<Logout />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/AdminPages/Dashboard";
import { Route, Router, Routes } from "react-router-dom";
import Appointments from "./pages/AdminPages/Appointments";
import DoctorList from "./pages/AdminPages/DoctorList";
import AddDoctor from "./pages/AdminPages/AddDoctor";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashBoard from "./pages/DoctorPages/DoctorDashBoard";
import DoctorProfile from "./pages/DoctorPages/DoctorProfile";
import DoctorAppointments from "./pages/DoctorPages/DoctorAppointments";

// if i have aToken then only i can access

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return aToken || dToken ? (
    <div>
      <Navbar />
      <div className="flex justify-start">
        <Sidebar />

        <Routes>
          {/* admin Routes */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Appointments" element={<Appointments />} />
          <Route path="/AddDoctor" element={<AddDoctor />} />
          <Route path="/DoctorList" element={<DoctorList />} />

          {/* Doctors Routes */}
          <Route path="/DoctorDashBoard" element={<DoctorDashBoard />} />
          <Route path="/DoctorProfile" element={<DoctorProfile />} />
          <Route path="/DoctorAppointments" element={<DoctorAppointments />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  ) : (
    <>
      <div>
        <Login />
        <ToastContainer />
      </div>
    </>
  );
};

export default App;

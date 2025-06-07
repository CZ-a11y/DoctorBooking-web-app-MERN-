import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Doctors from "../pages/Doctor/Doctor";
import MyAccount from "../Dashboard/user-account/MyAccount";
import DoctorDetails from "../pages/Doctor/DoctorDetails";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />

      {/* Patient Route */}
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={['patient']} fallbackPath="/doctors/profile/me">
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={['doctor']} fallbackPath="/users/profile/me">
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;

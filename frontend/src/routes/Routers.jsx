import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Lab from "../pages/Labs/Lab";
import TestDetails from "../pages/Labs/TestDetails";
import AllTest from "../pages/Labs/AllTest";
import AddTest from "../pages/Labs/AddTest";
import Prescribe from "../pages/Prescribe";
import Prescription from "../pages/Prescription";
import TestReport from "../pages/TestReport";
import MyReport from "../pages/MyReport";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/Products/ProductDetails";
import UpdateTest from "../pages/Labs/UpdateTest";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={
      
      <Home />
      
      } />

      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/alltests" element={<AllTest />} />
      <Route path="/test/add" element={<AddTest />} />
      <Route path="/labs" element={<Lab />} />
      <Route path="/labs/:id" element={<TestDetails />} />
      <Route path="/test/:id" element={<UpdateTest/>} />
      <Route path="/users/:id" element={<Prescribe />} />
      <Route path="/prescriptions/:id" element={<Prescription />} />
      <Route path="/users/:id/reports" element={<TestReport />} />
      <Route path="/reports/:id" element={<MyReport />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            {" "}
            <Dashboard />{" "}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;

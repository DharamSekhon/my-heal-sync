import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import PendingDoc from "../pages/Doctors/PendingDoc";
import ApprovedDoc from "../pages/Doctors/ApprovedDoc";
import CancelledDoc from "../pages/Doctors/CancelledDoc";
import Patients from "../pages/Patients/Patients";
import Appointments from "../pages/Appointments";
import TestBooked from "../pages/TestBooked";
import AddProduct from "../pages/Products/AddProduct";
import MyAccount from "../Dashboard/user-account/MyAccount";
import ProtectedRoute from "./ProtectedRoute";
import Orders from "../pages/Orders";
import AllProducts from "../pages/Products/AllProducts";
import UpdateProduct from "../pages/Products/UpdateProduct";
import Admins from "../pages/admins/Admins";
import FeedBacks from "../Dashboard/user-account/FeedBacks";
import AddAdmins from "../pages/admins/AddAdmin";

const Routers = () => {
  return (
    <Routes>
      {/* <ProtectedRoute> */}

      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/doctors-section"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Doctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors-section/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DoctorDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pending-doctors"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <PendingDoc />
          </ProtectedRoute>
        }
      />
      <Route
        path="/approved-doctors"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ApprovedDoc />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cancelled-doctors"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CancelledDoc />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients-section"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Patients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments-section"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Appointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tests-section"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <TestBooked />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders-section"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/all-products"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AllProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/all-products/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/all-products/add"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admins"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admins />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admins-add"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddAdmins />
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedbacks"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <FeedBacks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile/me"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      {/* </ProtectedRoute> */}
    </Routes>
  );
};

export default Routers;

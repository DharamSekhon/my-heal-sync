import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaFileInvoice } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { GrDocumentTest } from "react-icons/gr";
import useFetchData from "../hooks/useFetchData";
import { BASE_URL } from "../config";
import Loader from "../components/Loader/Loading";

const Home = () => {
  // const { data: chart } = useFetchData(
  //   `https://charts.mongodb.com/charts-heal-sync-backend-fketd`
  // );

  const {
    data: doctors,
    loading: doctorsLoading,
    error: doctorsError,
  } = useFetchData(`${BASE_URL}/doctors`);

  const approvedDoctors = doctors.filter(
    (doctor) => doctor?.isApproved === "approved"
  );

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetchData(`${BASE_URL}/admins/patients`);

  const {
    data: appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useFetchData(`${BASE_URL}/admins/appointments`);

  const {
    data: order,
    loading: ordersLoading,
    error: ordersError,
  } = useFetchData(`${BASE_URL}/admins/orders`);

  const {
    data: tests,
    loading: testsLoading,
    error: testsError,
  } = useFetchData(`${BASE_URL}/admins/tests`);

  // const [orders,setOrders] = useState([]);

  if (
    doctorsLoading ||
    userLoading ||
    appointmentsLoading ||
    ordersLoading ||
    testsLoading
  ) {
    return <Loader />;
  }

  if (
    doctorsError ||
    userError ||
    appointmentsError ||
    ordersError ||
    testsError
  ) {
    return (
      <div className="container">
        <p className="text-center text-[20px] font-medium text-textColor m-10 p-10">
          Error occurred. Please try again later.
        </p>
      </div>
    );
  }

  // let totalSale = 0;
  // {order.map((order) =>
  //   order.isPaid === true
  //     ? (totalSale = totalSale + order.price)
  //     : <h1>no</h1>
  // )}
  let totalAppointmentPrice = appointments
    .map((appointment) => parseFloat(appointment.ticketPrice))
    .filter((price) => !isNaN(price))
    .reduce((acc, curr) => acc + curr, 0);

  let totalOrderPrice = order
    .filter((order) => order.isPaid)
    .map((order) => parseFloat(order.price))
    .filter((price) => !isNaN(price))
    .reduce((acc, curr) => acc + curr, 0);

  let totalTestPrice = tests
    .filter((tests) => tests.isPaid)
    .map((tests) => parseFloat(tests.price))
    .filter((price) => !isNaN(price))
    .reduce((acc, curr) => acc + curr, 0);

  const totalRevenue = totalAppointmentPrice + totalOrderPrice + totalTestPrice;

  return (
    <>
      <title>Dashboard</title>
      <div className="min-h-screen">
        <div className=" flex flex-col items-center gap-5 p-4 ">
          <h1 className=" text-2xl lg:text-3xl text-textColor font-bold">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="  p-5 w-[90%] lg:w-[57%] ml-5 lg:ml-5 lg:mt-5 h-full lg:h-[25rem] mr-5 grid grid-cols-1 lg:grid-cols-2 shadow-md  ">
            <div className=" mt-5 ml-[4rem] lg:ml-[5rem] rounded-[25px] bg-slate-50 shadow-md flex mb-2 p-2 justify-between items-center h-[6rem] w-[18rem]">
              <div className="p-2">
                <Link to="/doctors-section">
                  <h1 className="font-semibold text-[18px]">Doctors</h1>
                </Link>
                <p className="font-medium text-textColor text-[15px]">
                  {approvedDoctors.length}
                </p>
              </div>
              <div className="p-2">
                <Link to="/doctors-section">
                  <FaUserDoctor className="text-[50px]  p-2 rounded-md" />
                </Link>
              </div>
            </div>

            <div className="  rounded-[25px] ml-[4rem] lg:ml-5 mt-5 bg-slate-50 shadow-md flex p-2 mb-2  justify-between items-center h-[6rem] w-[18rem]">
              <div className="p-2">
                <Link to="/patients-section">
                  <h1 className="font-semibold text-[18px]">Patients</h1>
                </Link>
                <p className="font-medium text-textColor text-[15px]">
                  {user.length}
                </p>
              </div>
              <div className="p-2">
                <Link to="/patients-section">
                  <FaUserAlt className="text-[50px]  p-2 rounded-md" />
                </Link>
              </div>
            </div>

            <div className="ml-[4rem] lg:ml-[5rem] mt-5 rounded-[25px] bg-slate-50 shadow-md flex p-2 mb-2   justify-between items-center h-[6rem] w-[18rem]">
              <div className="p-2">
                <Link to="/appointments-section">
                  <h1 className="font-semibold text-[18px]">Appointments</h1>
                </Link>
                <p className="font-medium text-textColor text-[15px]">
                  {appointments.length}
                </p>
              </div>
              <div className="p-2">
                <Link to="/appointments-section">
                  <SlCalender className="text-[50px]  p-2 rounded-md" />
                </Link>
              </div>
            </div>

            <div className=" ml-[4rem] lg:ml-5 mt-5 rounded-[25px] bg-slate-50 shadow-md flex p-2 mb-2  justify-between items-center h-[6rem] w-[18rem]">
              <div className="p-2">
                <Link to="/orders-section">
                  <h1 className="font-semibold text-[18px]">Orders</h1>
                </Link>
                <p className="font-medium text-textColor text-[15px]">
                  {order.length}
                </p>
              </div>
              <div className="p-2">
                <Link to="/orders-section">
                  <FaFileInvoice className="text-[50px]  p-2 rounded-md" />
                </Link>
              </div>
            </div>

            <div className=" mt-5 ml-[4rem] lg:ml-[5rem]  rounded-[25px] bg-slate-50 shadow-md flex p-2  mb-4 justify-between items-center h-[6rem] w-[18rem] ">
              <div className="p-2">
                <Link to="/tests-section">
                  <h1 className="font-semibold text-[18px]">Test Booked</h1>
                </Link>
                <p className="font-medium text-textColor text-[15px]">
                  {tests.length}
                </p>
              </div>
              <div className="p-2">
                <Link to="/tests-section">
                  <GrDocumentTest className="text-[50px]  p-2 rounded-md" />
                </Link>
              </div>
            </div>

            <div className=" mt-5 ml-[4rem] lg:ml-5 rounded-[25px] bg-slate-50 shadow-md flex p-2 align-middle  mb-4 justify-between items-center h-[6rem] w-[18rem] ">
              <div className="p-2">
                <h1 className="font-semibold text-[18px]">Revenue</h1>
                <p className="font-medium text-textColor text-[15px]">
                  ₹{totalRevenue}
                </p>
              </div>
              <div className="p-2">
                <FaFileInvoiceDollar className="text-[50px]  p-2 rounded-md" />
              </div>
            </div>
          </div>

          <div className="  shadow-md border-2 w-[90%] lg:w-[37%] ml-5 mt-5 h-[25rem] mr-5  rounded-md">
            <iframe
              className="m-0 ml-6 lg:ml-0 w-[90%] p-0  lg:p-5 text-center"
              width="540"
              height="400"
              src="https://charts.mongodb.com/charts-heal-sync-backend-fketd/embed/charts?id=65fd7f0f-8a29-4fbf-8b39-fae6541b0ecc&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </div>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-fit m-5 h-fit  gap-20 p-5">
          <iframe
            className=" shadow-md "
            width="400"
            height="280"
            src="https://charts.mongodb.com/charts-heal-sync-backend-fketd/embed/charts?id=65fd5a6d-a863-44bf-8034-f0f32032188f&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>
          <iframe
            className=" shadow-md "
            width="400"
            height="280"
            src="https://charts.mongodb.com/charts-heal-sync-backend-fketd/embed/charts?id=65fd6f2a-9dd2-4145-84f7-69ef0ae61651&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>

          <iframe
            className=" shadow-md "
            width="400"
            height="280"
            src="https://charts.mongodb.com/charts-heal-sync-backend-fketd/embed/charts?id=65fd7154-9dd2-4b20-8e01-69ef0aeccd44&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>
        </div>
        <div className=" flex justify-center items-center">
          <iframe
            className=" shadow-md "
            width="800"
            height="400"
            src="https://charts.mongodb.com/charts-heal-sync-backend-fketd/embed/charts?id=65fd6aac-1ecb-42c6-8785-8ffdcf934806&maxDataAge=300&theme=light&autoRefresh=true"
            frameborder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Home;

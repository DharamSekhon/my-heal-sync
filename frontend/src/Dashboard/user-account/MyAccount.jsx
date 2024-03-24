import React, { useContext, useState } from "react";
import { authContext } from "./../../context/AuthContext";
import MyBookings from "./MyBookings";
import MyTests from "./MyTests";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import MyPrescription from "./MyPrescription";
import { toast } from "react-toastify";
import MyReports from "./MyReports";
import MyOrder from "./MyOrder";
import { useEffect } from "react";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  // console.log(userData);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // console.log(userData._id);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
      localStorage.removeItem("token");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="max-w-[1370px] mt-[4rem] px-5 mx-auto">
        <title>Profile</title>
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid shadow-md md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px]  shadow-md rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[70px] h-[70px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[16px] leding-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[14px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[14px] leading-6 font-medium">
                  Blood type:{" "}
                  <span className="ml-2 text-headingColor text-[14px] leading-8">
                    {userData.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] flex flex-col justify-center items-center md:mt-[100px]">
                <button
                  onClick={() => setTab("settings")}
                  className={` ${
                    tab == "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-5 rounded-md text-headingColor font-semibold w-[55%] text-[14px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-[55%] bg-[#181A1E] mt-4 p-3 text-[14px] leading-7 rounded-md text-white "
                >
                  Logout
                </button>
                <button
                  onClick={handleDelete}
                  className="w-[55%] bg-red-600 mt-4 p-3 text-[14px] leading-7 rounded-md text-white"
                >
                  Delete account
                </button>
              </div>
            </div>

            <div className="md:col-span-2  md:px-[30px]">
              <div className="grid grid-cols-3 col-span-3 lg:grid-cols-5 grid-flow-row gap-3 lg:grid-flow-col ">
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab == "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[12px] leading-7 border border-solid border-primaryColor`}
                >
                  Bookings
                </button>

                <button
                  onClick={() => setTab("tests")}
                  className={`${
                    tab == "tests" && "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[12px] leading-7 border border-solid border-primaryColor`}
                >
                  Tests
                </button>

                <button
                  onClick={() => setTab("prescriptions")}
                  className={`${
                    tab == "prescriptions" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[12px] leading-7 border border-solid border-primaryColor`}
                >
                  Prescriptions
                </button>

                <button
                  onClick={() => setTab("reports")}
                  className={`${
                    tab == "reports" && "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[12px] leading-7 border border-solid border-primaryColor`}
                >
                  Reports
                </button>

                <button
                  onClick={() => setTab("orders")}
                  className={`${
                    tab == "orders" && "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[12px] leading-7 border border-solid border-primaryColor`}
                >
                  Orders
                </button>
              </div>

              {tab == "bookings" && <MyBookings />}

              {tab == "tests" && <MyTests />}

              {tab == "prescriptions" && <MyPrescription user={userData} />}

              {tab == "reports" && <MyReports user={userData} />}

              {tab == "orders" && <MyOrder />}

              {tab == "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAccount;

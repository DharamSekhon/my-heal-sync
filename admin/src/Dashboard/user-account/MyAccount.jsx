import React, { useContext, useState } from "react";
import { authContext } from "./../../context/AuthContext";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("settings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  // console.log(userData);
  const navigate = useNavigate();
  const handleAdminButton = () => {};

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
    <section>
      <title>Profile</title>

      <div className="max-w-[970px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[30px] px-[10px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[80px] h-[80px] rounded-full border-2 border-solid border-primaryColor">
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
                <p className="text-textColor text-[14px] leading-6 items-center font-medium">
                  Blood type:{" "}
                  <span className="ml-2 text-headingColor text-[15px] leading-8">
                    {userData.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] ml-[5rem] lg:ml-0 flex flex-col md:mt-[100px]">
                <Link
                  to={`/admins`}
                  className="w-[10rem] h-[2.6rem] ml-[3rem] text-center bg-[#181A1E] p-2 text-[13px] leading-7 rounded-md text-white "
                >
                  Admins
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-[10rem] h-[2.6rem] ml-[3rem] align-middle bg-[#181A1E] mt-4 text-[13px] leading-7 rounded-md text-white "
                >
                  Logout
                </button>
                <button
                  onClick={handleDelete}
                  className="w-[10rem] h-[2.6rem] ml-[3rem] bg-red-600 mt-3  text-[13px] leading-7 rounded-md text-white"
                >
                  Delete account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("settings")}
                  className={` ${
                    tab == "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-1 px-3 rounded-md text-headingColor font-semibold text-[14px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {tab == "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;

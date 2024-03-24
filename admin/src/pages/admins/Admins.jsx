import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BASE_URL, token } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loading";
import { IoArrowBackSharp } from "react-icons/io5";

const Admins = () => {
  const [query, setQuery] = useState("");

  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());

    console.log("handle search");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: admins,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/admins?query=${debounceQuery}`);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="container">
        <p className="text-center text-[20px] font-medium text-textColor m-10 p-10">
          Error occurred. Please try again later.
        </p>
      </div>
    );

  //   const handleDelete = (e) => {
  //     error.preventDefault();
  //     alert("Item has been deleted!");
  //   };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${_id}`, {
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

      setTimeout(() => {
        window.location.reload();
      }, 1000);

      // Show an alert or notification to indicate successful deletion
    } catch (err) {
      // Handle errors, such as network errors or server errors
      toast.error(err.message);
    }
  };

  return (
    <>
      <title>Admins</title>
      <div className="flex items-center flex-row lg:ml-10 ">
        <Link
          className="flex items-center p-4 bg-primaryColor px-4 py-2 ml-7 mt-6 text-white text-[14px] font-bold rounded-md"
          to={"/admin/profile/me"}
        >
          <IoArrowBackSharp className="text-white" />
          Back
        </Link>
      </div>
      <div className="container flex flex-col mt-0 items-center gap-5 p-4 ">
        <h1 className="text-[28px] text-textColor font-bold">Admins</h1>
      </div>

      <div className="container">
        <Link to={`/admins-add`}>
          <button className="flex items-center text-md mt-0 rounded-md mb-1 bg-primaryColor py-[4px] px-[23px] text-white font-[600] ">
            <IoMdAdd className="text-xl mr-2" />
            Add Admin
          </button>
        </Link>
      </div>

      <div className="container mt-2 flex flex-col gap-5 ">
        {admins.map((admins) => (
          <div
            key={admins.id}
            className="flex items-center h-[4rem] mt-4 justify-between container border rounded-md shadow-md "
          >
            <div className="flex">
              <img
                src={admins.photo}
                className="lg:w-11 lg:h-11 w-8 h-8 rounded-full"
                alt=""
              />
              <div className="pl-3">
                <div className=" text-lg font-semibold">{admins.name}</div>
                <div className=" text-xs text-gray-500 font-semibold">
                  {admins.email}
                </div>
              </div>
            </div>

            <div className="flex max-w-full gap-4">
              <button
                className="m-2 flex items-center w-36 bg-red-400 px-8 py-2 rounded-md shadow-sm text-sm lg:text-md font-bold"
                onClick={() => handleDelete(admins._id)}
              >
                <MdOutlineDeleteForever className="mr-2 text-xl" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Admins;

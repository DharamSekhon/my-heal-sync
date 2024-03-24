import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BASE_URL, token } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loading";

const Feedbacks = () => {
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
    data: feedbacks,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/feedbacks`);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="container">
        <p className="text-center text-[20px] font-medium text-textColor m-10 p-10">
          Error occurred. Please try again later.
        </p>
      </div>
    );

  return (
  
     <>
      <title>Feedbacks</title>
      <div className="container flex flex-col items-center gap-5 p-4 ">
        <h1 className="text-3xl text-textColor font-bold">Feedbacks</h1>
        
      </div>

      

      <div className="container mt-2 flex flex-col gap-5 ">
        {feedbacks.map((feedbacks) => (
          <div
            key={feedbacks.id}
            className="flex items-center h-[6rem] mt-4 justify-between container border rounded-md shadow-md "
          >
            <div className="flex">
              
              <div className="pl-3">
                <div className=" text-xl font-semibold">{feedbacks.name}</div>
                <div className=" text-base font-semibold">{feedbacks.email}</div>
              </div>
            </div>

            <div className="flex max-w-full gap-4">
              <button
                className="m-2 flex items-center w-36 bg-red-400 px-8 py-2 rounded-md shadow-sm text-lg font-bold"
                onClick={() => handleDelete(admins._id)}
              >
                <MdOutlineDeleteForever className="mr-2 text-2xl" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    
    </>
  );
};

export default Feedbacks;

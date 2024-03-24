import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BASE_URL, token } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const AllTest = () => {
  const [query, setQuery] = useState("");

  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: labtests,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/labs?query=${debounceQuery}`);

  
  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`${BASE_URL}/labs/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <title>All Tests</title>
      <div className="container mt-10  text-center">
        <h2 className="heading text-[2rem]">Tests </h2>
        <div className="max-w-[570px] max-h-10 mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input
            type="search"
            className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
            placeholder="Search Test"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn mt-0 rounded-[0px] rounded-r-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>


      <div className="container mt-8">
        <Link to={`/test/add`}>
          <button className="flex flex-initial items-center text-md mt-0 rounded-md mb-1 bg-primaryColor py-[5px] px-[20px] text-white font-[600] ">
            <IoMdAdd className="text-xl mr-2" />
            Add a test
          </button>
        </Link>
      </div>

      {loading && <Loader />}

        {error && <Error />}

         {!loading && !error && (

      <div className="container mt-4 flex flex-col gap-5 ">
        {labtests.map((labtest) => (
          <div
            key={labtest.id}
            className="flex items-center  justify-between container border rounded-md shadow-md "
          >
            <h1 className="text-md font-medium ml-4">{labtest.name}</h1>

            <div className="flex max-w-full gap-4">
              <Link to={`/test/${labtest._id}`}>
                <button className="m-2 lg:w-36 flex  items-center bg-gray-300 rounded-md shadow-sm px-8 py-2 text-md  font-bold">
                  <MdOutlineModeEdit className="mr-2 text-xl" /> Edit
                </button>
              </Link>
              <button
                className="m-2 flex items-center lg:w-36 bg-red-400 px-8 py-2 rounded-md shadow-sm text-md  font-bold"
                onClick={() => handleDelete(labtest._id)}
              >
                <MdOutlineDeleteForever className="mr-2 text-xl" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </>
  );
};

export default AllTest;

import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BASE_URL, token } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loading";

const AllProducts = () => {
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
    data: products,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/products?query=${debounceQuery}`);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="container">
        <p className="text-center text-[20px] font-medium text-textColor m-10 p-10">
          Error occurred. Please try again later.
        </p>
      </div>
    );

 

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${_id}`, {
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
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <title>All Products</title>
      <div className="container text-center ">
        <h1 className="text-2xl text-textColor font-bold">All Products</h1>
        <div className="max-w-[470px] max-h-[2.5rem] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input
            type="search"
            className="py-4 pl-4 pr-2 bg-transparent  w-full focus:outline-none cursor-pointer placeholder:text-textColor"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className=" mt-0 p-2 w-[5rem] text-[15px] bg-primaryColor text-white  items-center rounded-[0px] rounded-r-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="container mt-8">
        <Link to={`/all-products/add`}>
          <button className="flex flex-initial items-center text-md mt-0 rounded-md mb-1 bg-primaryColor py-[5px] px-[20px] text-white font-[600] ">
            <IoMdAdd className="text-xl mr-2" />
            Add Product
          </button>
        </Link>
      </div>

      <div className="container mt-4 flex flex-col gap-5 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center  justify-between container border rounded-md shadow-md "
          >
            <h1 className="text-md font-medium ml-4">{product.title}</h1>

            <div className="flex max-w-full gap-4">
              <Link to={`/all-products/${product._id}`}>
                <button className="m-2 lg:w-36 flex  items-center bg-gray-300 rounded-md shadow-sm px-8 py-2 text-md  font-bold">
                  <MdOutlineModeEdit className="mr-2 text-xl" /> Edit
                </button>
              </Link>
              <button
                className="m-2 flex items-center lg:w-36 bg-red-400 px-8 py-2 rounded-md shadow-sm text-md  font-bold"
                onClick={() => handleDelete(product._id)}
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

export default AllProducts;

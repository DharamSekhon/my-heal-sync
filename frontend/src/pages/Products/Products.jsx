import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { doctors } from "../../assets/data/doctors";
import Testimonal from "../../components/Testimonal/Testimonal";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import ProductsCard from "../../components/Products/ProductsCard";

const Products = () => {
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
  //   console.log(products);
  return (
    <>
      <title>Medicines</title>
      <div className="">
        <div className="container mt-10 mb-10  text-center">
          <h2 className="font-bold text-black text-3xl m-4">Medicines</h2>
          <div className="max-w-[470px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className=" pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search"
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

        <div className="container">
          {loading && <Loader />}

          {error && <Error />}
          {!loading && !error && (
            <div className="grid shadow-md p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
              {products.map((product) => (
                <div class="max-w-[60%] max-h-[15rem] bg-white border border-gray-200 rounded-lg shadow ">
                  <a href={`/products/${product._id}`}>
                    <img className="p-1 rounded-lg" src={product.photo} />
                  </a>
                  <div class="px-5 pb-5">
                    <a href={`/products/${product._id}`}>
                      <h5 class="text-lg mt-5 font-semibold tracking-tight text-gray-900 ">
                        {product.title}
                      </h5>
                    </a>

                    <div class="flex items-center justify-between">
                      <span class="text-md font-bold mt-2 text-gray-900 ">
                        ₹{product.price}
                      </span>
                      <a
                        href={`/products/${product._id}`}
                        className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center "
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;

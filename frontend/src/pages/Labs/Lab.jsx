import React, { useEffect, useState } from "react";
import LabCard from "./LabCard";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Lab = () => {
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
    data: labtests,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/labs?query=${debounceQuery}`);

  return (
    <>
      <div className="container mt-10  text-center">
        <h2 className="heading text-[2rem]">Affordable Package</h2>
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

      <div className="container mt-10 mx-auto ">
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 shadow-md m-5 px-5 ">
            {labtests.map((labtest) => (
              <LabCard key={labtest.id} labTest={labtest} />
            ))}
          </div>
        )}

        <title>Lab</title>
      </div>
    </>
  );
};

export default Lab;

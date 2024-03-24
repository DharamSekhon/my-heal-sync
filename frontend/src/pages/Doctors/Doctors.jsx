import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { doctors } from "../../assets/data/doctors";
import Testimonal from "../../components/Testimonal/Testimonal";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Doctors = () => {
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
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  return (
    <>
      <title>Doctors</title>
      <div className="container mt-10  text-center">
        <h2 className="heading text-[2rem]">Find a Doctor</h2>
        <div className="max-w-[570px] max-h-10 mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input
            type="search"
            className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
            placeholder="Search Doctor"
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

      <div className="container mt-[2rem] shadow-md p-5">
        {loading && <Loader />}

        {error && <Error />}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What ou patients say</h2>
          </div>

          <Testimonal />
        </div>
      </section>
    </>
  );
};

export default Doctors;

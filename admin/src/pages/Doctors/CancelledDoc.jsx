import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const CancelledDoc = () => {
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
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/admins/doctors?query=${debounceQuery}`);

  if (loading) return <Loader />;
  if (error) return <Error />;

  // Filter doctors based on isApproved status
  const cancelledDoctors = doctors.filter(
    (doctor) => doctor.isApproved === "cancelled"
  );

  return (
    <>
      <title>Cancelled Doctors</title>
      <div className="container text-center">
        <h2 className="heading mt-5 text-[30px]">Cancelled Doctors</h2>
        <div className="max-w-[470px] max-h-[2.5rem] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input
            type="search"
            className="py-4 pl-4 pr-2 bg-transparent  w-full focus:outline-none cursor-pointer placeholder:text-textColor"
            placeholder="Search Doctor"
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

      {/* Section for approved doctors */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {cancelledDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>
      {!loading && !error && cancelledDoctors.length == 0 && (
        <h2 className="mt-5 text-center   text-[20px] font-semibold text-primaryColor">
          No doctor yet!
        </h2>
      )}

      {/* Section for pending doctors */}
    </>
  );
};

export default CancelledDoc;

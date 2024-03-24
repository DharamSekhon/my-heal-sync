import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import { Link } from "react-router-dom";

const Doctors = () => {
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
  if (error)
    return (
      <div className="container">
        <p className="text-center text-[20px] font-medium text-textColor m-10 p-10">
          Error occurred. Please try again later.
        </p>
      </div>
    );

  // Filter doctors based on isApproved status
  const approvedDoctors = doctors
    .filter((doctor) => doctor.isApproved === "approved")
    .slice(0, 4);
  const pendingDoctors = doctors
    .filter((doctor) => doctor.isApproved === "pending")
    .slice(0, 4);
  const cancelledDoctors = doctors
    .filter((doctor) => doctor.isApproved === "cancelled")
    .slice(0, 4);

  return (
    <>
      <title>Doctors</title>
      <div className="container text-center">
        <h2 className="heading mt-5 text-[30px]">Doctors</h2>
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
        <div className="container border-2 rounded-md shadow-md ">
          <div className="flex items-center justify-between">
            <h2 className="heading">Approved Doctors</h2>
            <Link
              className="border-2 bg-primaryColor text-white font-bold m-4 px-5 py-2 rounded-md"
              to="/approved-doctors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {approvedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Section for pending doctors */}
      <section>
        <div className="container border-2 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="heading">Pending Doctors</h2>
            <Link
              className="border-2 bg-primaryColor text-white font-bold m-4 px-5 py-2 rounded-md"
              to="/pending-doctors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {pendingDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <section className="">
        <div className="container border-2 rounded-md shadow-md ">
          <div className="flex items-center justify-between">
            <h2 className="heading">Cancelled Doctors</h2>
            <Link
              className="border-2 bg-primaryColor text-white font-bold m-4 px-5 py-2 rounded-md"
              to="/cancelled-doctors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {cancelledDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;

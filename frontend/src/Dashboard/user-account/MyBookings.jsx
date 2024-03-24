import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { formateDate } from "../../utils/formateDate";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="container">
          <table className="m-4 w-[90%] lg:w-full">
            <thead className="text-xs text-left text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Doctor Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Speciality
                </th>

                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="items-center">
              {appointments.map((doctor) => (
                <tr key={doctor._id}>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <div className="pl-3">
                      <Link to={`/doctors/${doctor._id}`}>
                        <div className="text-[13px] font-semibold">
                          {doctor.name}
                        </div>
                      </Link>
                    </div>
                  </th>

                  <td className="px-6 text-[13px] py-4">
                    {doctor.specialization}
                  </td>
                  <td className="px-6 text-[13px] py-4">
                    {formateDate(doctor.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && appointments.length == 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You did not book any doctor yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;

import React from "react";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { Link, useParams } from "react-router-dom";
import PresCard from "../../components/Cards/PresCard";
import { formateDate } from "../../utils/formateDate";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyPrescription = ({ user }) => {
  //   const { id } = useParams();
  const { data, loading, error } = useFetchData(
    `${BASE_URL}/users/${user._id}`
  );

  return (
    <>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <table className="m-4 w-[90%] lg:w-full">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Prescribed by
              </th>

              <th scope="col" className="px-6 py-3">
                Prescribed On
              </th>
            </tr>
          </thead>

          <tbody>
            {data.prescriptions?.map((prescription) => (
              <tr key={prescription._id}>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <div className="pl-3">
                    <div className="text-[13px] font-semibold">
                      {prescription.doctor}
                    </div>
                  </div>
                </th>

                <td className="px-6 text-[13px] py-4">
                  {formateDate(prescription.createdAt)}
                </td>
                <td>
                  <Link
                    to={`/prescriptions/${prescription._id}`}
                    className="border px-2 py-2 bg-gray-300 text-[10px] lg:text-[13px] text-textColor rounded-md font-semibold"
                  >
                    View Prescription
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && data.prescriptions?.length == 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You did not have any prescription yet!
        </h2>
      )}
    </>
  );
};

export default MyPrescription;

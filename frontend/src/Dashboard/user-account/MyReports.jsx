import React from "react";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { Link, useParams } from "react-router-dom";
import PresCard from "../../components/Cards/PresCard";
import { formateDate } from "../../utils/formateDate";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyReports = ({ user }) => {
  const { data: tests } = useFetchData(
    `${BASE_URL}/users/appointments/my-tests`
  );

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
                Package Name
              </th>

              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {data.reports?.map((prescription) => (
              <tr key={prescription._id}>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <div className="pl-3">
                    <div className="text-[13px] font-semibold">
                      {prescription?.testpackage}
                    </div>
                  </div>
                </th>

                <td className="px-6 text-[13px]  py-4">
                  {formateDate(prescription.createdAt)}
                </td>
                <td>
                  <Link
                    to={`/reports/${prescription._id}`}
                    className="border px-2 text-[10px] lg:text-[13px]  py-2 bg-gray-300 text-textColor rounded-md font-semibold"
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && data.reports?.length == 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You did not book any doctor yet!
        </h2>
      )}
    </>
  );
};

export default MyReports;

import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import LabCard from "../../pages/Labs/LabCard";
import { formateDate } from "../../utils/formateDate";
import { Link } from "react-router-dom";

const MyTests = () => {
  const {
    data: tests,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-tests`);

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="container">
          <table className="m-4 w-full">
            <thead className="text-xs text-left text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Package Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Booked on
                </th>
              </tr>
            </thead>
            <tbody>
              {tests.map((tests) => (
                <tr key={tests._id}>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                   
                    <div className="pl-3">
                      <Link to={`/labs/${tests._id}`}>
                        <div className="text-[13px] font-semibold">
                          {tests.name}
                        </div>
                      </Link>
                      
                    </div>
                  </th>

                  

                  <td className="px-6 text-[13px] py-4">{formateDate(tests.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && tests.length == 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You did not book any test yet!
        </h2>
      )}
    </div>
  );
};

export default MyTests;

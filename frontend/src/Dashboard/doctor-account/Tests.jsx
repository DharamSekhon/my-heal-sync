import React, { useState } from "react";
import { formateDate } from "../../utils/formateDate";
import { Link } from "react-router-dom";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
// import SlideReport from "../../components/Slideover/SilideReport";

const Tests = ({ tests }) => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );

  return (
    <>
      {data.isApproved == "approved" && (
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-[9px] lg:text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Test Name
              </th>

              <th scope="col" className="px-6 py-3">
                Patient Name
              </th>

              <th scope="col" className="px-6 py-3">
                Payment
              </th>

              <th scope="col" className="px-6 py-3">
                Booked On
              </th>
            </tr>
          </thead>
          <tbody>
            {tests?.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 text-[9px] lg:text-sm">
                  {item?.labTest?.name}
                </td>
                <td className="px-6 py-4 text-[9px] lg:text-sm">
                  {item?.user?.name}
                </td>
                <td className="px-6 py-4 text-[9px] lg:text-sm">
                  {item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-1 w-1 lg:h-2.5 lg:w-2.5 rounded-full bg-green-500 mr-2"></div>
                      Paid
                    </div>
                  )}

                  {!item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-1 w-1 lg:h-2.5 lg:w-2.5 rounded-full bg-red-500 mr-2"></div>
                      Not Paid
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-[9px] lg:text-sm">
                  {formateDate(item.createdAt)}
                </td>
                <td>
                  <Link
                    to={`/users/${item?.user?._id}/reports`}
                    className="border px-2 py-2 text-[9px] lg:text-sm bg-gray-300 text-textColor rounded-md font-semibold"
                  >
                    Generte
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Tests;

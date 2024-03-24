import React from "react";
import { formateDate } from "../utils/formateDate";
import { BASE_URL } from "../config";
import useFetchData from "../hooks/useFetchData";
import Loader from "../components/Loader/Loading";

const TestBooked = () => {
  const {
    data: user,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/admins/tests`);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="container">
        <p className="text-center text-[20px] font-medium text-textColor m-10 p-10">
          Error occurred. Please try again later.
        </p>
      </div>
    );

  return (
    <>
      <title>Tests</title>
      <div className="container rounded-sm min-h-screen  shadow-md mt-10 lg:p-10 ">
        <table className="lg:w-[100%] w-[60%] text-left text-sm text-gray-500">
          <thead className="text-[10px] lg:text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                S.No
              </th>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Test Name
              </th>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Patient
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Price
              </th>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Payment
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Booked On
              </th>
            </tr>
          </thead>

          <tbody>
            {user?.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-2 lg:px-6 text-[10px] lg:text-sm lg:py-4">
                  {index + 1}
                </td>
                <td className="px-4 py-2 lg:px-6 text-[10px] lg:text-sm lg:py-4">
                  {item.labTest?.name}
                </td>
                <td className="px-4 py-2 lg:px-6 text-[10px] lg:text-sm lg:py-4">
                  <div className="pl-3">
                    <div className="text-[10px] lg:text-sm font-semibold">
                      {item.user?.name}
                    </div>
                    <div className="text-[8px] lg:text-xs text-gray-500">
                      {item.user?.email}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-2 lg:px-6 text-[10px] lg:text-sm lg:py-4">
                  {item.price}
                </td>
                <td className="px-4 py-2 lg:px-6 text-[10px] lg:text-sm lg:py-4">
                  {item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      Paid
                    </div>
                  )}

                  {!item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                      Not Paid
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 lg:px-6 text-[10px] lg:text-sm lg:py-4">
                  {formateDate(item.createdAt)}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TestBooked;

import React from "react";
import { BASE_URL } from "../config";
import useFetchData from "../hooks/useFetchData";
import { formateDate } from "../utils/formateDate";
import Loader from "../components/Loader/Loading";

const Appointments = () => {
  const {
    data: user,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/admins/appointments`);

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
      <title>Appointments</title>
      <div className="container rounded-sm min-h-screen  shadow-md mt-10 lg:p-10">
        <table className="lg:w-[100%] w-[60%] text-left text-sm lg:ml-10 text-gray-500">
          <thead className="text-[10px] lg:text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                S.No
              </th>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Doctor Name
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Patient Name
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
                <td className="text-[10px] lg:text-sm px-4 py-2 lg:px-6 lg:py-4">
                  {index + 1}
                </td>
                <td className="px-4 py-2 lg:px-6 lg:py-4 text-[10px] lg:text-sm">
                  {item.doctor.name}
                </td>
                <td className="px-4 py-2 lg:px-6 lg:py-4 text-[10px] lg:text-sm">
                  {item.user.name}
                </td>
                <td className="px-4 py-2 lg:px-6 lg:py-4 text-[10px] lg:text-sm">
                  {item.ticketPrice}
                </td>
                <td className="px-4 py-2 lg:px-6 lg:py-4 text-[10px] lg:text-sm">
                  {item.isPaid && (
                    <div className="flex items-center">
                      <div className="lg:h-2.5 lg:w-2.5 w-1 h-1 rounded-full bg-green-500 mr-2"></div>
                      Paid
                    </div>
                  )}

                  {!item.isPaid && (
                    <div className="flex items-center">
                      <div className="lg:h-2.5 lg:w-2.5 w-1 h-1 rounded-full bg-red-500 mr-2"></div>
                      Not Paid
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 lg:px-6 lg:py-4 text-[10px] lg:text-sm">
                  {formateDate(item.createdAt)}
                </td>
                <td className="px-4 py-2 lg:px-6 lg:py-4 text-[10px] lg:text-sm">
                  {item.gender}
                </td>
                {/* <td className="px-6 py-4">{formateDate(item.createdAt)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Appointments;

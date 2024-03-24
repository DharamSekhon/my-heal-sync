import React from "react";
import { formateDate } from "../../utils/formateDate";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";

const Patients = () => {
  const {
    data: user,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/admins/patients`);

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
      <title>Patients</title>
      <div className="container rounded-sm  shadow-md mt-10 lg:p-10">
        <table className="lg:w-[100%] w-[60%] text-left text-sm text-gray-500">
          <thead className="text-[10px] lg:text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                S.No
              </th>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Name
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Email
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Phone
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Gender
              </th>
            </tr>
          </thead>

          <tbody>
            {user?.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-2 lg:px-6 text-[10px] lg:text-sm lg:py-4">
                  {index + 1}
                </td>
                <th
                  scope="row"
                  className="flex items-center px-4 py-2 lg:px-6 lg:py-4 text-gray-900 whitespace-nowrap"
                >
                  <img
                    src={item.photo}
                    className="lg:w-10 lg:h-10 w-5 h-5 rounded-full"
                    alt=""
                  />
                  <div className="pl-3">
                    <div className="text-[10px] lg:text-sm font-semibold">
                      {item.name}
                    </div>
                  </div>
                </th>
                <td className="px-4 py-2 lg:px-6 lg:py-4 text-[9px] lg:text-sm">
                  {item.email}
                </td>
                <td className="px-4 py-2 lg:px-6 lg:py-4 text-[10px] lg:text-sm">
                  {item.phone}
                </td>
                <td className="px-4 py-2 lg:px-6 lg:py-4 text-[10px] lg:text-sm">
                  {item.gender}
                </td>
                {/* <td className="px-6 py-4">{formateDate(item.createdAt)}</td> */}
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Patients;

import React from "react";
import { formateDate } from "../../utils/formateDate";
import { Link } from "react-router-dom";
import nouser from '../../assets/images/nouser.png'

const Appointments = ({ appointments }) => {
  return (
    <table className="lg:w-[90%]  text-left sm:text-[2px] lg:text-sm text-gray-500">
      <thead className="text-[9px] lg:text-sm text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>

          <th scope="col" className="px-6 py-3">
            Gender
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
        {appointments?.map((item) => (
          <tr key={item._id}>
            <th
              scope="row"
              className="flex items-center text-[9px] lg:text-sm px-6 py-4 text-gray-900 whitespace-nowrap"
            >
              {item.user.photo && (
              <img
                src={item.user.photo}
                className="w-10 h-10 rounded-full"
                alt=""
              />)}
              {!item.user.photo && (

              <img
                src={nouser}
                className="w-9 h-9 rounded-full"
                alt=""
              />)}
              <div className="pl-3">
                <div className="text-[10px] lg:text-sm font-semibold">{item.user.name}</div>
                <div className="text-normal text-gray-500">
                  {item.user.email}
                </div>
              </div>
            </th>

            <td className="px-6 text-[9px] lg:text-sm py-4">{item.user.gender}</td>
            <td className="px-6 py-4">
              {item.isPaid && (
                <div className="flex text-[9px] lg:text-sm items-center">
                  <div className="h-2.5 w-2.5  rounded-full bg-green-500 mr-2"></div>
                  Paid
                </div>
              )}

              {!item.isPaid && (
                <div className="flex items-center text-[9px] lg:text-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                  Not Paid
                </div>
              )}
            </td>
            {/* <td className="px-6 py-4">{item.ticketPrice}</td> */}
            <td className="px-6 py-4 text-[9px] lg:text-sm">{formateDate(item.createdAt)}</td>
            <td>
              <Link
                to={`/users/${item.user._id}`}
                className="border px-2 py-2 bg-gray-300 text-[8px] lg:text-sm text-textColor rounded-md font-semibold"
              >
                Prescribe
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;

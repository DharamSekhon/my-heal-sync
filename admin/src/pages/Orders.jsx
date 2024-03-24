import React from "react";
import { BASE_URL } from "../config";
import useFetchData from "../hooks/useFetchData";
import { formateDate } from "../utils/formateDate";
import Loader from "../components/Loader/Loading";

const Orders = () => {
  const {
    data: order,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/admins/orders`);

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
      <title>Orders</title>
      <div className="container rounded-sm min-h-screen  shadow-md mt-10 p-10">
        <table className="lg:w-[100%] w-[60%] text-left  text-sm text-gray-500">
          <thead className="text-[10px] lg:text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                S.No
              </th>
              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Order
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Customer
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Price
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Payment
              </th>

              <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="text-[10px] lg:text-sm">
            {order?.map((item, index) => (
              <tr key={item._id}>
                <td className="text-[10px] lg:text-sm px-4 py-2 lg:px-6 lg:py-4">
                  {index + 1}
                </td>
                {/* <td
                  scope="row"
                  className="flex items-center px-2 py-2 lg:px-6 lg:py-4 text-gray-900 whitespace-nowrap"
                >
                  {item.product.title}
                </td> */}
                <td className="px-4 py-2 lg:px-6 lg:py-4">
                  {item.product?.title}
                </td>
                <td className="px-2 py-2 lg:px-6 lg:py-4">{item.user?.name}</td>
                <td className="px-4 py-2 lg:px-6 lg:py-4">{item?.price}</td>
                <td className="px-4 py-2 lg:px-6 lg:py-4">
                  {item.isPaid && (
                    <div className="flex items-center">
                      <div className="lg:h-2.5 lg:w-2.5 w-1 h-1 text-sm rounded-full bg-green-500 mr-2"></div>
                      Paid
                    </div>
                  )}

                  {!item.isPaid && (
                    <div className="flex items-center">
                      <div className="lg:h-2.5 lg:w-2.5 w-1 h-1 text-sm rounded-full bg-red-500 mr-2"></div>
                      Not Paid
                    </div>
                  )}
                </td>
                <td className="text-[10px] lg:text-sm px-4 py-2 lg:px-6 lg:py-4 ">
                  {formateDate(item?.createdAt)}
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

export default Orders;

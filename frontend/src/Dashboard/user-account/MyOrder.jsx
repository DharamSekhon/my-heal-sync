import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import ProductsCard from "../../components/Products/ProductsCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { formateDate } from "../../utils/formateDate";
import { Link } from "react-router-dom";

const Myorder = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-products`);
  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div>
          <table className="m-4 w-[90%] lg:w-full">
            <thead className="text-xs text-left text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Purchase Date
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((products) => (
                <tr key={products._id}>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <div className="pl-3">
                      <Link to={`/products/${products._id}`}>
                        <div className="text-[13px]  font-semibold">
                          {products.title}
                        </div>
                      </Link>
                    </div>
                  </th>

                  <td className="px-6 text-[13px]  py-4">
                    {formateDate(products.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && products.length == 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You did not buy any medicine yet!
        </h2>
      )}
    </div>
  );
};

export default Myorder;

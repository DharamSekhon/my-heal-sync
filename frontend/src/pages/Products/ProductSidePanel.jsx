import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import { GiTestTubes } from "react-icons/gi";
import { Link } from "react-router-dom";

const ProductSidePanel = ({ openedProductId }) => {
  const {
    data: products,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/products`);

  const { title, price } = products;
  // console.log(labtests.name);

  return (
    <div className="container flex flex-col  items-center border-2 rounded-md xl:ml-4">
      <p className="text-black m-4  text-xl font-bold">Related</p>

      {products
        .filter((products) => products._id !== openedProductId)
        .map((products) => (
          <div
            key={products.id}
            className="container bg-gray-50 flex justify-center items-center mb-10 gap-2 shadow-lg"
          >
            <div className="container p-2">
              <div className=" w-[14rem]">
                <Link to={`/products/${products._id}`}>
                  <p className="text-textColor border-b border-gray-300 font-semibold mb-2 m-1 text-[18px] ">
                    {products.title}
                  </p>
                  <p className="text-textColor font-semibold mb-3  m-1 text-[16px] ">
                    ₹{products.price}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductSidePanel;

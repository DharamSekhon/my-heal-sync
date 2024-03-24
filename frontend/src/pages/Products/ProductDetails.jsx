import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";

import { BASE_URL, token } from "../../config";

import { BsDot } from "react-icons/bs";
import { TiDocumentText } from "react-icons/ti";
import { toast } from "react-toastify";
import ProductSidePanel from "./ProductSidePanel";

const ProductDetails = () => {
  const [tab, setTab] = useState("about");
  const [showSlideOver, setShowSlideOver] = useState(false);

  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/products/${id}`);

  const { title, description, photo, price } = product;

  // console.log(product);
  const bookingLabHandler = async () => {
    const productid = product._id;
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/productcheckout-session/${productid}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + "Try again");
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openedProductId = product._id;
  // console.log(openedLabTestId)

  const openSlideOver = () => {
    setShowSlideOver(true);
  };

  return (
    <>
      <title>{product.title}</title>
      <section className="">
        <div className="max-w-[1250px] px-5 mx-auto">
          {loading && <Loader />}

          {error && <Error />}
          {!loading && !error && (
            <div className="grid sm:grid-cols-1 md:grid-cols-4 ">
              <div className="md:col-span-3">
                <div className="flex   bg-white items-center  border-2 rounded-md">
                  <div className="  ml-8 ">
                    <img
                      src={product.photo}
                      className="xl:max-w-[40rem] md:max-w-[10rem] sm:max-h-[10rem] max-h-[11rem] rounded-sm"
                    ></img>
                  </div>
                  <div className="bg-white container">
                    <div className=" border-textColor border-b p-5 m-2">
                      <h3 className="text-headingColor  xl:text-[28px] leading-9 mt-3 font-bold">
                        {title}
                      </h3>

                      <p className="text__para text-[20px] leading-6 font-bold text-black  lg:max-w-[390px]">
                        ₹ {price}
                      </p>
                    </div>

                    <div className="m-2 p-2 flex items-center justify-between">
                      <div className="flex">{""}</div>
                      <button
                        onClick={bookingLabHandler}
                        className="bg-primaryColor py-[10px] px-[30px] rounded-md text-md text-white  "
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                  <button
                    onClick={() => setTab("about")}
                    className={`${
                      tab === "about" &&
                      "border-b border-solid border-primaryColor"
                    }py-2 px-5 mr-5 text-[16px]  leading-7 text-headingColor font-semibold`}
                  >
                    About
                  </button>
                </div>

                <div className="mt-[50px] mb-[10px]">
                  {tab == "about" && (
                    <div className="container  p-8  border-2 rounded-md">
                      <div className=" p-4 mb-2 flex gap-24">
                        <div>
                          <div className="items-center flex">
                            <TiDocumentText className="font-thin text-2xl" />
                            <p className="text-lg m-2 font-semibold">
                              Description
                            </p>
                          </div>

                          <div className="flex ml-4 mt-2 gap-3">
                            <div className=" flex ml-0 items-center px-3 ">
                              <BsDot className="text-2xl" />
                              <p className="text-md font-bold text-textColor ">
                                {description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="">
                <ProductSidePanel openedProductId={openedProductId} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

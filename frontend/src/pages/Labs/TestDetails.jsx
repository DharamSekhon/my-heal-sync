import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";

import { BASE_URL, token } from "../../config";
import { GrTest } from "react-icons/gr";
import { HiOutlineDocumentText, HiOutlineBeaker } from "react-icons/hi2";
import { IoIosBeaker } from "react-icons/io";
import { MdNoFood } from "react-icons/md";
import { LuTestTube2 } from "react-icons/lu";
import { VscPackage } from "react-icons/vsc";
import { BsDot } from "react-icons/bs";
import { TiDocumentText } from "react-icons/ti";
import LabSidePanel from "./LabSidePanel";
import { toast } from "react-toastify";
import SlideOver from "../../components/Slideover/SlideOver";
import LabTestimonal from "../../components/Testimonal/LabTestimonal";

const TestDetails = () => {
  const [tab, setTab] = useState("about");
  const [showSlideOver, setShowSlideOver] = useState(false);

  const { id } = useParams();
  const {
    data: labtests,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/labs/${id}`);

  const { name, tests, bio, price, sample, fasting, tube } = labtests;

  // console.log(labtests._id)
  const bookingLabHandler = async () => {
    const labTestid = labtests._id;
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/labcheckout-session/${labTestid}`,
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

  const openedLabTestId = labtests._id;
  // console.log(openedLabTestId)

  const openSlideOver = () => {
    setShowSlideOver(true);
  };

  return (
    <>
      <title>{name}</title>
      <section>
        <div className="max-w-[1350px] px-5 mx-auto">
          {loading && <Loader />}

          {error && <Error />}
          {!loading && !error && (
            <div className="grid sm:grid-cols-1 lg:grid-cols-4  ">
              <div className="md:col-span-3 ">
                <div className="flex   bg-white items-center  border-2 rounded-md w-[28rem] lg:w-full">
                  <figure className="max-w-[170px] max-h-[170px]">
                    <GrTest className="m-4 ml-[2.3rem] text-[28px] xl:text-[40px] " />
                  </figure>

                  <div className="container ">
                    <div className=" border-textColor border-b p-5 m-2">
                      <h3 className="text-headingColor text-[15px] lg:text-[28px] leading-9 mt-3 font-bold">
                        {name}
                      </h3>

                      <p className="m-3 text-[12px] lg:text-[15px] ml-0 lg:ml-2">
                        Includes {tests?.length} tests
                      </p>

                      <p className="text__para  text-[14px] lg:text-[20px] leading-6 font-bold text-black  lg:max-w-[390px]">
                        ₹ {price}
                      </p>
                    </div>

                    <div className="m-2 p-2 w-[20rem] lg:w-full flex items-center justify-between">
                      <div className="flex items-center">
                        <HiOutlineDocumentText className="text-lg lg:text-2xl font-light" />
                        <p className="p-2 text-[12px] lg:text-sm font-semibold">
                          Reports in 15 hrs
                        </p>
                      </div>
                      <button
                        onClick={bookingLabHandler}
                        className="bg-primaryColor py-[10px] px-[40px] rounded-md text-white font-[600] "
                      >
                        Book
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
                    }py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                  >
                    About
                  </button>
                </div>

                <div className="mt-[50px]">
                  {tab == "about" && (
                    <div className="container  p-8  border-2 rounded-md">
                      <div className=" mb-2 p-4 flex lg:flex-row flex-col gap-5 lg:gap-24">
                        <div className="items-center flex m-2">
                          <IoIosBeaker className="font-thin text-3xl" />
                          <p className="text-md m-2 font-semibold">
                            Sample Type
                          </p>
                          <p className="border-2 px-3 py-1 rounded-md bg-slate-100 text-sm font-bold text-textColor">
                            {sample}
                          </p>
                        </div>

                        <div className="items-center flex m-2">
                          <MdNoFood className="font-thin text-3xl" />
                          <p className="text-md m-2 font-semibold">
                            Fasting Required
                          </p>
                          <p className="border-2 px-3 py-1 rounded-md bg-slate-100 text-sm font-bold text-textColor">
                            {fasting}
                          </p>
                        </div>

                        <div className="items-center flex m-2">
                          <LuTestTube2 className="font-thin text-3xl" />
                          <p className="text-md m-2 font-semibold">Tube Type</p>
                          <p className="border-2 px-3 py-1 rounded-md bg-slate-100 text-sm font-bold text-textColor">
                            {tube}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 mb-2 flex gap-24">
                        <div>
                          <div className="items-center flex">
                            <VscPackage className="font-thin text-3xl" />
                            <p className="text-md m-2 font-semibold">
                              Package Includes
                            </p>
                          </div>

                          <div className="flex ml-4 mt-2 gap-3">
                            {labtests &&
                              labtests.tests &&
                              labtests.tests.slice(0, 2).map((labtest) => (
                                <div
                                  key={labtest.id}
                                  className="flex ml-0 items-center px-3 "
                                >
                                  <BsDot className="text-2xl" />
                                  <p className="text-md font-bold text-textColor">
                                    {labtest.testName}
                                  </p>
                                </div>
                              ))}
                          </div>
                          <p
                            onClick={() => setShowSlideOver(true)}
                            className="text-gray-600 font-thin text-center ml-8 mt-3 cursor-pointer hover:text-blue-500 hover:border-blue-500 hover:border-b w-[90px]"
                          >
                            Show More
                          </p>
                        </div>
                      </div>

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
                              <BsDot className="text-xl" />
                              <p className="text-md font-bold text-textColor ">
                                {bio}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <LabSidePanel openedLabTestId={openedLabTestId} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Slide-over component */}
      {showSlideOver && (
        <SlideOver onClose={() => setShowSlideOver(false)}>
          {/* Render content inside the slide-over */}
          <div>
            <h2 className="text-xl flex items-center font-semibold m-4 mt-0 text-center border-b">
              <VscPackage className="m-2 text-2xl" />
              Package includes {tests.length} tests
            </h2>

            {labtests &&
              labtests.tests &&
              labtests.tests.map((labtest) => (
                <div key={labtest.id} className="flex ml-0 items-center px-3 ">
                  <BsDot className="text-3xl" />
                  <p className="text-md font-bold text-textColor">
                    {labtest.testName}
                  </p>
                </div>
              ))}
          </div>
        </SlideOver>
      )}

      <LabTestimonal />

      
    </>
  );
};

export default TestDetails;

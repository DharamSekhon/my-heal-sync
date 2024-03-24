import React, { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { BASE_URL } from "../../config";
import SlideOver from "../../components/Slideover/SlideOver";
import { VscPackage } from "react-icons/vsc";
import { BsDot } from "react-icons/bs";

const LabCard = ({ labTest }) => {
  const { name, tests, bio, price } = labTest;
  const [showSlideOver, setShowSlideOver] = useState(false);

  const openSlideOver = () => {
    setShowSlideOver(true);
  };

  return (
    <>
      <div className="flex justify-center">
        <div class=" max-w-sm p-6  border border-[#eff6ff] mb-5  rounded-lg shadow  text-normal bg-[#f8fafc]">
          <Link to={`/labs/${labTest._id}`}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-textColor">
              {name}
            </h5>
          </Link>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => setShowSlideOver(true)}
            className="flex flex-row gap-20 border-2 rounded-sm  border-indigo-200 bg-indigo-100 mb-5 opacity-100 "
          >
            <p class="ml-2 text-[13px]  font-medium text-black">
              Includes {tests?.length} tests
            </p>
            <p className="text-textColor font-semibold text-[13px]  ml-12 mr-2">
              Show All
            </p>
          </div>

          <div className="items-center align-middle  justify-between flex flex-row gap-0">
            <p className=" mt-1 font-bold text-lg text-textColor">₹ {price} </p>

            <Link
              to={`/labs/${labTest._id}`}
              class="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-primaryColor rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Check now
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {showSlideOver && (
        <SlideOver onClose={() => setShowSlideOver(false)}>
          {/* Render content inside the slide-over */}
          <div>
            <h2 className="text-xl flex items-center font-semibold m-4 mt-0 text-center border-b">
              <VscPackage className="m-2 text-2xl" />
              Package includes {tests.length} tests
            </h2>

            {labTest &&
              labTest.tests &&
              labTest.tests.map((labtests) => (
                <div key={labtests.id} className="flex ml-0 items-center px-3 ">
                  <BsDot className="text-3xl" />
                  <p className="text-md font-bold text-textColor">
                    {labtests.testName}
                  </p>
                </div>
              ))}
          </div>
        </SlideOver>
      )}
    </>
  );
};

export default LabCard;

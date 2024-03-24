import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import { GiTestTubes } from "react-icons/gi";
import { Link } from "react-router-dom";

const LabSidePanel = ({ openedLabTestId }) => {
  const { data: labtests, loading, error } = useFetchData(`${BASE_URL}/labs`);

  const { name, tests, bio, price } = labtests;
  // console.log(labtests.name);

  return (
    <div className="container flex flex-col  items-center border-2 rounded-md xl:ml-4">
      <p className="text-black m-4  text-xl font-bold">Similar Packages</p>

      {labtests
        .filter((labtest) => labtest._id !== openedLabTestId)
        .map((labtest) => (
          <div
            key={labtest.id}
            className="container bg-gray-50 flex justify-center items-center mb-10 gap-2 shadow-lg"
          >
            <div className="container p-0 ">
              <GiTestTubes className="text-3xl  ml-4" />
            </div>

            <div className="container p-2">
              <div className="border-b border-gray-300 w-[14rem]">
                <Link to={`/labs/${labtest._id}`}>
                  <p className="text-black font-semibold mb-2 m-1 text-[17px] ">
                    {labtest.name}
                  </p>
                  <p className="text-textColor font-semibold mb-3  m-1 text-[16px] ">
                    ₹{labtest.price}
                  </p>
                </Link>
              </div>
              <div className="container text-textColor mb-2 mt-2 m-1 font-semibold p-1 ">
                <Link to={`/labs/${labtest._id}`}>
                  Include {labtest.tests.length} tests
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LabSidePanel;

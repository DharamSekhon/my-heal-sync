import React from "react";
import logo from "../assets/images/logo.png";
import useFetchData from "../hooks/useFetchData";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { formateDate } from "../utils/formateDate";
import { IoArrowBackSharp } from "react-icons/io5";
import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error";

const MyReport = () => {
  const { id } = useParams();

  const {
    data: prescriptions,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/reports/${id}`);

  return (
    <>
      <div className="flex items-center flex-row m-5 ">
        <Link
          className="flex items-center p-4 bg-primaryColor px-6 py-2 mt-6 text-white font-bold rounded-md"
          to={"/users/profile/me"}
        >
          <IoArrowBackSharp className="text-white" />
          Back
        </Link>
      </div>

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="container flex justify-center">
          <div className="w-[50rem] p-5   border-2 rounded-md ">
            <div className="flex border-b border-gray-300 pb-[60px] justify-between">
              <div className=" mt-20 ">
                <h1 className="font-bold text-textColor text-xl">
                  {prescriptions?.doctor}{" "}
                </h1>
                <h1 className="font-medium mt-2 text-textColor text-sm">
                  Date:{formateDate(prescriptions?.createdAt)}{" "}
                </h1>
              </div>
              <div className="m-4 p-2">
                <img className="h-[4rem]" src={logo} alt="" />
              </div>
            </div>

            <div className="mt-14 border-b border-gray-300">
              <h1 className="font-bold text-textColor text-xl">Package:</h1>
              <p className="m-6 mt-4 font-medium text-textColor text-lg">
                {prescriptions?.testpackage}
              </p>
            </div>

            <div className="p-4  mt-10 ">
              <table className="w-full text-center  text-md text-gray-500">
                <thead className="border-y border-gray-400 text-sm text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className=" px-6 py-3">
                      Test
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Value
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Remarks
                    </th>
                  </tr>
                </thead>

                <tbody className="border-b border-gray-400">
                  {prescriptions?.tests?.map((item) => (
                    <tr key={item._id}>
                      <th
                        scope="row"
                        className=" items-center text-[15px] px-6 py-4 text-textColor whitespace-nowrap"
                      >
                        {item.testname}

                        {/* {item.user.email}  */}
                      </th>

                      <th className="px-6 text-[15px] text-textColor py-4">
                        {item.testvalue}
                      </th>

                      <th className="px-6 text-[15px] text-textColor py-4">
                        {item.remarks}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-14 border-b border-gray-300">
              <h1 className="font-bold text-textColor text-xl">Result:</h1>
              <p className="m-6 mt-4 font-medium text-textColor text-md">
                {prescriptions?.result}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyReport;

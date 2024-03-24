import React, { useEffect, useState } from "react";
import { BASE_URL, token } from ".././config";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import useGetProfile from "../hooks/useFetchData";
import { IoArrowBackSharp } from "react-icons/io5";

const TestReport = ({ testData }) => {
  const [formData, setFormData] = useState({
    doctor: "",

    testpackage: "",

    tests: [{ testname: "", testvalue: "", remarks: "" }],
    result: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      doctor: testData?.doctor || "", // Default to empty string if prescriptionData.doctor is undefined
      testpackage: testData?.testpackage || "",
      tests: testData?.tests || [],
      result: testData?.instructions || "",
    });
  }, [testData]);

  let { id } = useParams();

  const {
    data: labtests,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/${id}`);
  // console.log(labtests.tests.length);

  const { data: doctorName } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  useEffect(() => {
    if (doctorName) {
      setFormData((prevState) => ({
        ...prevState,
        doctor: doctorName.name, // Set the fetched doctor name in the state
      }));
    }
  }, [doctorName]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTestHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/users/${id}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      // const result = await res.json();

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
        // console.log(result.message);
      }

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
      // console.log(err.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData };

      if (!Array.isArray(updatedData[key])) {
        updatedData[key] = [];
      }

      updatedData[key] = [...updatedData[key], item];

      return updatedData;
    });
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];

      updateItems[index][name] = value;

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addTest = (e) => {
    e.preventDefault();

    addItem("tests", {
      testname: "",
      testvalue: "",
      remarks: "",
    });
  };

  const deleteTest = (e, index) => {
    e.preventDefault();

    deleteItem("tests", index);
  };

  const handleTestChange = (event, index) => {
    handleReusableInputChangeFunc("tests", index, event);
  };

  return (
    <>
      <div className="flex items-center flex-row ml-5 ">
        <Link
          className="flex items-center p-4 bg-primaryColor px-6 py-2 text-sm mt-6 text-white font-bold rounded-md"
          to={"/doctors/profile/me"}
        >
          <IoArrowBackSharp className="text-white" />
          Back
        </Link>
      </div>
      <div className="container h-full w-[50%] p-4 border-4">
        <div className="">
          <h1 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
            Generate Test Report
          </h1>

          <form onSubmit={addTestHandler}>
            <div className="mb-5">
              <p className="form__label">Patient Name: </p>
              <input
                type="text"
                value={labtests?.name}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Doctor Name: </p>
              <input
                type="text"
                value={formData.doctor}
                placeholder="Enter Test Name"
                className="form__input"
                readOnly // Make the doctor name input field read-only
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Package:</p>
              <input
                type="text"
                name="testpackage"
                value={formData.testpackage}
                onChange={handleInputChange}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Tests*</p>

              {formData.tests?.map((item, index) => (
                <div key={index}>
                  <div>
                    <div className="grid grid-cols-3 gap-5">
                      <div>
                        <p className="form__label">Name*</p>
                        <input
                          type="text"
                          name="testname"
                          value={item.testname}
                          className="form__input"
                          onChange={(e) => handleTestChange(e, index)}
                        />
                      </div>
                      <div>
                        <p className="form__label">Value*</p>
                        <input
                          type="number"
                          name="testvalue"
                          value={item.testvalue}
                          className="form__input"
                          onChange={(e) => handleTestChange(e, index)}
                        />
                      </div>
                      <div>
                        <p className="form__label">Remarks*</p>
                        <select
                          name="remarks"
                          value={item.remarks}
                          className="form__input"
                          onChange={(e) => handleTestChange(e, index)}
                        >
                          {/* Map through tests data to populate options */}
                          <option>Select</option>
                          <option>Below average</option>
                          <option>Normal</option>
                          <option>High</option>
                        </select>
                        {/* <p className="form__label">Remarks*</p>
                        <input
                          type="text"
                          name="remarks"
                          value={item.remarks}
                          className="form__input"
                          onChange={(e) => handleTestChange(e, index)}
                        /> */}
                      </div>
                    </div>

                    <button
                      onClick={(e) => deleteTest(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addTest}
                className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
              >
                Add Test
              </button>
            </div>

            <div className="mb-5">
              <p className="form__label">Result:</p>
              <input
                type="text"
                name="result"
                value={formData.result}
                onChange={handleInputChange}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mt-7">
              <button
                type="submit"
                // onClick={AddTestHandler}
                className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
              >
                Generate Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TestReport;

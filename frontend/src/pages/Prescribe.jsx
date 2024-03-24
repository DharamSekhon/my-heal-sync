import React, { useEffect, useState } from "react";
import { BASE_URL, token } from ".././config";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import useGetProfile from "../hooks/useFetchData";
import { IoArrowBackSharp } from "react-icons/io5";

const Prescribe = ({ prescriptionData }) => {
  const [formData, setFormData] = useState({
    doctor: "",

    diagnosis: "",
    instructions: "",
    medications: [{ name: "", dosage: "", frequency: "" }],
    follow: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      doctor: prescriptionData?.doctor || "", // Default to empty string if prescriptionData.doctor is undefined
      diagnosis: prescriptionData?.diagnosis || "",
      medications: prescriptionData?.medications || [],
      instructions: prescriptionData?.instructions || "",
      follow: prescriptionData?.follow || "",
    });
  }, [prescriptionData]);

  let { id } = useParams();
  const {
    data: user,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/${id}`);

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
      const res = await fetch(`${BASE_URL}/users/${id}/prescriptions`, {
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

    addItem("medications", {
      name: "",
      dosage: "",
      frequency: "",
    });
  };

  const deleteTest = (e, index) => {
    e.preventDefault();

    deleteItem("medications", index);
  };

  const handleTestChange = (event, index) => {
    handleReusableInputChangeFunc("medications", index, event);
  };

  return (
    <>
      <div className="flex items-center flex-row m-5 ">
        <Link
          className="flex items-center p-4 bg-primaryColor px-6 py-2 mt-6 text-white font-bold rounded-md"
          to={"/doctors/profile/me"}
        >
          <IoArrowBackSharp className="text-white" />
          Back
        </Link>
      </div>
      <div className="container  w-[40%] p-4 border-4 ">
        <div className="">
          <h1 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
            Prescribe Patient
          </h1>

          <form onSubmit={addTestHandler}>
            <div className="mb-5">
              <p className="form__label">Patient Name: </p>
              <input
                type="text"
                value={user.name}
                placeholder="Enter Test Name"
                className="form__input"
                readOnly
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
              <p className="form__label">medications*</p>
              {formData.medications?.map((item, index) => (
                <div key={index}>
                  <div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <p className="form__label">Name*</p>
                        <input
                          type="text"
                          name="name"
                          value={item.name}
                          className="form__input"
                          onChange={(e) => handleTestChange(e, index)}
                        />
                      </div>
                      <div>
                        <p className="form__label">Dosage*</p>
                        <input
                          type="text"
                          name="dosage"
                          value={item.dosage}
                          className="form__input"
                          onChange={(e) => handleTestChange(e, index)}
                        />
                      </div>
                      <div>
                        <p className="form__label">Frequency*</p>
                        <input
                          type="text"
                          name="frequency"
                          value={item.frequency}
                          className="form__input"
                          onChange={(e) => handleTestChange(e, index)}
                        />
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
                Add Medications
              </button>
            </div>

            <div className="mb-5">
              <p className="form__label">Diagnosis:</p>
              <input
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">instructions:</p>
              <input
                type="text"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Follow Up:</p>
              <input
                type="text"
                name="follow"
                value={formData.follow}
                onChange={handleInputChange}
                placeholder="Enter Follow"
                className="form__input"
              />
            </div>

            <div className="mt-7">
              <button
                type="submit"
                // onClick={AddTestHandler}
                className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
              >
                Prescribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Prescribe;

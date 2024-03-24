import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const AddTest = ({ labTestData }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    bio: "",
    tests: [],
    sample: "",
    fasting: "",
    tube: "",
  });

  useEffect(() => {
    setFormData({
      name: labTestData?.name,
      price: labTestData?.price,
      bio: labTestData?.bio,
      tests: labTestData?.tests,
      sample: labTestData?.sample,
      fasting: labTestData?.fasting,
      tube: labTestData?.tube,
    });
  }, [labTestData]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTestHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/labs`, {
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
      }

      toast.success(result.message);
      navigate("/alltests");
    } catch (err) {
      toast.error(err.message);
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
      testName: "",
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
      <div className="flex items-center flex-row m-5 ">
        <Link
          className="flex items-center p-4 bg-primaryColor px-6 py-2 mt-6 text-white font-bold rounded-md"
          to={"/alltests"}
        >
          <IoArrowBackSharp className="text-white" />
          Back
        </Link>
      </div>

      <div className="container  w-[50%] p-4 border-4  ">
        <div className="">
          <h1 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
            Provide Information
          </h1>

          <form onSubmit={addTestHandler}>
            <div className="mb-5">
              <p className="form__label">Test Name:</p>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <p className="form__label">Test Name*</p>
                        <input
                          type="text"
                          name="testName"
                          value={item.testName}
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
                Add Test
              </button>
            </div>

            <div className="mb-5">
              <p className="form__label">Sample Type:</p>
              <input
                type="text"
                name="sample"
                value={formData.sample}
                onChange={handleInputChange}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Fasting Required:</p>
              <input
                type="text"
                name="fasting"
                value={formData.fasting}
                onChange={handleInputChange}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Tube Type:</p>
              <input
                type="text"
                name="tube"
                value={formData.tube}
                onChange={handleInputChange}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Test Bio:</p>
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Test Price:</p>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter Test Price"
                className="form__input"
              />
            </div>

            <div className="mt-7">
              <button
                type="submit"
                // onClick={AddTestHandler}
                className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
              >
                Add Test
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTest;

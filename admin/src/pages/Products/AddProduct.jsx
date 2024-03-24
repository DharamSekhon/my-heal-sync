import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const AddProduct = ({ productData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      title: productData?.title,
      price: productData?.price,
      description: productData?.description,
      photo: productData?.photo,
    });
  }, [productData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });

    // later we will use cloudinary to upload images
    // console.log(file);
  };
  const navigate = useNavigate();

  const addTestHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/products`, {
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
      navigate("/all-products");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <title>Add</title>
      <div className="flex items-center flex-row m-5 ">
        <Link
          className="flex items-center p-4 bg-primaryColor px-6 py-2 mt-6 text-white font-bold rounded-md"
          to={"/all-products"}
        >
          <IoArrowBackSharp className="text-white" />
          Back
        </Link>
      </div>
      <div className="container h-full w-[50%] p-4 border-4 mt-20">
        <div className="">
          <h1 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
            Provide Information
          </h1>

          <form onSubmit={addTestHandler}>
            <div className="mb-5">
              <p className="form__label">Product Name:</p>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter Test Name"
                className="form__input"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Test Description:</p>
              <input
                type="text"
                name="description"
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
            <div className="mb-5 flex items-center gap-3">
              {formData.photo && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img
                    src={formData.photo}
                    alt=""
                    className="w-full rounded-full "
                  />
                </figure>
              )}

              <div className="relative w-[160px] h-[50px]">
                <input
                  type="file"
                  name="photo"
                  id="customFile"
                  onChange={handleFileInputChange}
                  accept=".jpg, .png"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />

                <label
                  htmlFor="customFile"
                  className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff34] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                >
                  {selectedFile ? selectedFile.name : "Upload a photo"}
                </label>
              </div>
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

export default AddProduct;

import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";

import { Link, useNavigate, useParams } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import useFetchData from "../../hooks/useFetchData";

const UpdateProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { data: product } = useFetchData(`${BASE_URL}/products/${id}`);

  const [formData, setFormData] = useState({
    title: "",
    price: "",

    photo: null,
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      title: product.title,
      price: product.price,
      photo: product.photo,
      description: product.description,
    });
  }, [product]);

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

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/products/${product._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/all-products");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
    <title>Edit</title>
    <div className="flex items-center flex-row m-5 ">
        <Link
          className="flex items-center p-4 bg-primaryColor px-6 py-2 mt-6 text-white font-bold rounded-md"
          to={"/all-products"}
        >
          <IoArrowBackSharp className="text-white" />
          Back
        </Link>
      </div>
    <div className="container w-[40%] border-2 h-full mt-10 shadow-md rounded-md p-5">
      
      <div className="">
        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Full Name"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="number"
              placeholder="Enter you email"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
              aria-readonly
              readOnly
            />
          </div>

          <div className="mb-5">
            <input
              type="text"
              placeholder="Password"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
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
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={25} color="#fffff" /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default UpdateProduct;

import React, { useState } from "react";
import signupImg from "../../assets/images/signup.gif";

import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { IoArrowBackSharp } from "react-icons/io5";

const AddAdmins = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "admin",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    // console.log(data);

    setPreviewUrl(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });

    // later we will use cloudinary to upload images
    // console.log(file);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/admins");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <title>Admin</title>
      <div className="flex items-center flex-row ml-2 lg:ml-10  ">
        <Link
          className="flex items-center p-4 bg-primaryColor px-5 py-2 mt-6 text-sm text-white font-bold rounded-md"
          to={"/admins"}
        >
          <IoArrowBackSharp className="text-white" />
          Back
        </Link>
      </div>
      <div className="lg:w-[40%] w-[70%]    mt-0 mx-auto">
        <div className="grid grid-cols-1 ">
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[26px] leading-9 font-bold mb-10">
              Add <span className="text-primaryColor">Admin</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[13px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[13px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[13px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[13px] leaading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[12px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Admin</option>
                  </select>
                </label>

                <label className="text-headingColor font-bold text-[13px] leaading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[12px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[40px] h-[40px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt=""
                      className="w-full rounded-full "
                    />
                  </figure>
                )}

                <div className="relative w-[120px] h-[30px]">
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
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[13px] leading-6 overflow-hidden bg-[#0066ff34] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[15px] leading-[30px] rounded-lg px-3 py-2"
                >
                  {loading ? <HashLoader size={35} color="#fffff" /> : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdmins;

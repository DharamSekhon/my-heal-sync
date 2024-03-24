import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

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
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
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
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 m-5 mb-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[13px] lg:text-[14px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            required
          />
        </div>

        <div className="mb-5">
          <input
            type="email"
            placeholder="Enter you email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[13px] lg:text-[14px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[13px] lg:text-[14px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
          />
        </div>

        <div className="mb-5">
          <input
            type="number"
            placeholder="Enter you phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[13px] lg:text-[14px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
          />
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full pr-4  py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[13px] lg:text-[14px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            required
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[13px] lg:text-[14px] leaading-7">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[13px] lg:text-[14px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="lg:w-[50px] lg:h-[50px] w-[30px] h-[30px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full "
              />
            </figure>
          )}

          <div className="relative w-[140px] h-[40px]">
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
              className="absolute top-0 left-0 w-[90%] h-full flex items-center px-[0.75rem] py-[0.375rem] text-[13px] lg:text-[14px] leading-6 overflow-hidden bg-[#0066ff34] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectedFile ? selectedFile.name : "Upload a photo"}
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[14px] lg:text-[15px] leading-[30px] rounded-lg lg:px-3 lg:py-2"
          >
            {loading ? <HashLoader size={25} color="#fffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

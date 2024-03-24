import React, { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import { BASE_URL, token } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(`${BASE_URL}/doctors/${id}`);
  const [isApproved, setIsApproved] = useState(data.isApproved !== "approved");

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/doctors/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved: "approved" }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      setIsApproved(true); // Update local state to reflect the approval
      toast.success(result.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err.message);
    }
  };

  const cancelProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/doctors/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved: "cancelled" }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      setIsApproved(true); // Update local state to reflect the approval
      toast.success(result.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section>
      <title>Doctor</title>
      <div className="max-w-[1070px] border rounded-md py-5 px-5 mx-auto">
        {loading && <Loader />}

        {error && <Error />}
        {!loading && !error && (
          <div className="container">
            <div className="flex items-center gap-4 mb-10">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={data?.photo} alt="" className="w-[90%]" />
              </figure>
              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[10px] leading-4 lg:text-[13px] lg:leading-6 font-semibold">
                  {data.specialization}
                </span>

                <h3 className="text-[20px] leading-9 font-bold text-headingColor mt-3">
                  {data.name}
                </h3>

                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-headingColor text-[12px] leading-5 lg:text-[14px] lg:leading-6 font-semibold">
                    <img src={starIcon} alt="" />
                    {data.averageRating}
                  </span>

                  <span className=" text-textColor text-[12px] leading-5 lg:text-[14px] lg:leading-6 font-semibold">
                    ({data.totalRating})
                  </span>
                </div>

                <p className="text__para text-[14px] lg:max-w-[390px] leading-6">
                  {data?.bio}
                </p>
                {/* {data.isApproved} */}
              </div>
            </div>
            <DoctorAbout
              name={data.name}
              about={data.about}
              qualifications={data.qualifications}
              experiences={data.experiences}
            />

            <div className="flex items-center justify-center gap-10 mt-10">
              <button
                type="submit"
                onClick={cancelProfileHandler}
                className="bg-red-600 text-white text-[18px] leading-[30px] lg:w-[18%] w-full py-3 px-4 rounded-lg"
              >
                Cancel Profile
              </button>
              {/* Only display the "Approve Profile" button if the profile is not already approved */}
              {data.isApproved !== "approved" && (
                <button
                  type="submit"
                  onClick={updateProfileHandler}
                  className="bg-green-500 text-white text-[18px] leading-[30px] lg:w-[18%] w-full py-3 px-4 rounded-lg"
                >
                  Approve Profile
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;

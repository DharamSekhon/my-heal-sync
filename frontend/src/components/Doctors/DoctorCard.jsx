import React from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {
  const { name, avgRating, totalRating, photo, specialization, experiences } =
    doctor;

  return (
    <div className="p-3 w-[14rem] lg:p-5 shadow-lg rounded-md m-5 mb-10">
      <div>
        <img src={photo} className="w-[10rem] ml-3" alt="" />
      </div>

      <h2 className="text-[14px] leading-[30px] lg:text-[18px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
        {name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-1 lg:px-3 text-[12px] leading-4 lg:text-[13px] lg:leading-7 font-semibold rounded">
          {specialization}
        </span>

        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[8px] leading-6 lg:text-[10px] lg:leading-7 font-semibold text-headingColor">
            <img src={starIcon} alt="" />
            {avgRating}
          </span>

          <span className="text-[10px] leading-6 lg:text-[12px] lg:leading-7 font-[400] text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>

      <div className="mt-[18px] flex items-center justify-between">
        <div className="">
          {/* <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
            +{totalPatients} patients
          </h3> */}
          <p className="text-[12px] leading-6 font-[400] text-textColor">
            At {experiences && experiences[0]?.hospital}
          </p>
        </div>

        <Link
          to={`/doctors/${doctor._id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E]  flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="w-4 h-3  group-hover:text-white " />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;

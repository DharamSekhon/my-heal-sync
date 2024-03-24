import React from "react";
import { Link } from "react-router-dom";

const PresCard = (presData) => {
  return (
    <>
      <div className="flex justify-center">
        <div class=" max-w-sm p-6  border border-[#eff6ff] mb-5  rounded-lg shadow  text-normal bg-[#f8fafc]">
          <Link to={`/prescriptions/${presData.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-textColor">
              {diagnosis}
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PresCard;

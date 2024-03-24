import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <HashLoader className="text-center align-middle" color="#0067FF" />
    </div>
  );
};

export default Loading;

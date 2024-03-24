// import React, { useContext, useRef } from "react";
// import { BiMenu } from "react-icons/bi";
// import { authContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL, token } from "../../config";
// import { toast } from "react-toastify";
// import useGetProfile from "../../hooks/useFetchData";

// const Tabs = ({ tab, setTab }) => {
//   const { dispatch } = useContext(authContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch({ type: "LOGOUT" });
//     navigate("/");
//   };

//   const {
//     data: delDoc,
//     loading,
//     error,
//   } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

//   // console.log(delDoc);

//   const handleDelete = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/doctors/${delDoc._id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.message);
//       }

//       toast.success(result.message);
//       localStorage.removeItem("token");
//       window.location.reload();
//     } catch (err) {
//       // Handle errors, such as network errors or server errors
//       toast.error(err.message);
//     }
//   };
//   const menuRef = useRef(null);

//   const toogleMenu = () => menuRef.current.classList.toggle("show__menu");

//   return (
//     <div>
//       <span className="md:hidden" onClick={toogleMenu}>
//         <BiMenu className="w-6 h-6 cursor-pointer" />
//       </span>
//       <div className=" hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
//         <button
//           onClick={() => setTab("overview")}
//           className={`${
//             tab == "overview"
//               ? "bg-indigo-100 text-primaryColor"
//               : "bg-transparent text-headingColor"
//           } w-full btn mt-0 rounded-md `}
//         >
//           Overview
//         </button>

//         <button
//           onClick={() => setTab("appointments")}
//           className={`${
//             tab == "appointments"
//               ? "bg-indigo-100 text-primaryColor"
//               : "bg-transparent text-headingColor"
//           } w-full btn mt-0 rounded-md `}
//         >
//           Appointments
//         </button>

//         <button
//           onClick={() => setTab("tests")}
//           className={`${
//             tab == "tests"
//               ? "bg-indigo-100 text-primaryColor"
//               : "bg-transparent text-headingColor"
//           } w-full btn mt-0 rounded-md `}
//         >
//           Tests
//         </button>

//         <button
//           onClick={() => setTab("settings")}
//           className={`${
//             tab == "settings"
//               ? "bg-indigo-100 text-primaryColor"
//               : "bg-transparent text-headingColor"
//           } w-full btn mt-0 rounded-md `}
//         >
//           Profile
//         </button>

//         <div className="mt-[100px] w-full">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white "
//           >
//             Logout
//           </button>
//           <button
//             onClick={handleDelete}
//             className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
//           >
//             Delete account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tabs;

// import React, { useContext, useRef, useState } from "react";
// import { BiMenu } from "react-icons/bi";
// import { authContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL, token } from "../../config";
// import { toast } from "react-toastify";
// import useGetProfile from "../../hooks/useFetchData";

// const Tabs = ({ tab, setTab }) => {
//   const { dispatch } = useContext(authContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch({ type: "LOGOUT" });
//     navigate("/");
//   };

//   const {
//     data: delDoc,
//     loading,
//     error,
//   } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

//   const handleDelete = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/doctors/${delDoc._id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.message);
//       }

//       toast.success(result.message);
//       localStorage.removeItem("token");
//       window.location.reload();
//     } catch (err) {
//       // Handle errors, such as network errors or server errors
//       toast.error(err.message);
//     }
//   };

//   const menuRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   return (
//     <div>
//       <span className="md:hidden" onClick={toggleMenu}>
//         <BiMenu className="w-6 h-6 cursor-pointer" />
//       </span>
//       <div
//         className={`${
//           isMenuOpen ? "block" : "hidden"
//         }  p-[30px] lg:visible bg-white shadow-panelShadow items-center h-max rounded-md`}
//       >
//         <button
//           onClick={() => {
//             setTab("overview");
//             toggleMenu(); // Close menu after clicking a tab
//           }}
//           className={`${
//             tab === "overview"
//               ? "bg-indigo-100 text-primaryColor"
//               : "bg-transparent text-headingColor"
//           } w-full btn mt-0 rounded-md mb-2`}
//         >
//           Overview
//         </button>

//         <button
//           onClick={() => {
//             setTab("appointments");
//             toggleMenu(); // Close menu after clicking a tab
//           }}
//           className={`${
//             tab === "appointments"
//               ? "bg-indigo-100 text-primaryColor"
//               : "bg-transparent text-headingColor"
//           } w-full btn mt-0 rounded-md mb-2`}
//         >
//           Appointments
//         </button>

//         <button
//           onClick={() => {
//             setTab("tests");
//             toggleMenu(); // Close menu after clicking a tab
//           }}
//           className={`${
//             tab === "tests"
//               ? "bg-indigo-100 text-primaryColor"
//               : "bg-transparent text-headingColor"
//           } w-full btn mt-0 rounded-md mb-2`}
//         >
//           Tests
//         </button>

//         <button
//           onClick={() => {
//             setTab("settings");
//             toggleMenu(); // Close menu after clicking a tab
//           }}
//           className={`${
//             tab === "settings"
//               ? "bg-indigo-100 text-primaryColor"
//               : "bg-transparent text-headingColor"
//           } w-full btn mt-0 rounded-md mb-2`}
//         >
//           Profile
//         </button>

//         <div className="mt-[100px] w-full">
//           <button
//             onClick={() => {
//               handleLogout();
//               toggleMenu(); // Close menu after clicking the button
//             }}
//             className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white mb-2"
//           >
//             Logout
//           </button>
//           <button
//             onClick={() => {
//               handleDelete();
//               toggleMenu(); // Close menu after clicking the button
//             }}
//             className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white"
//           >
//             Delete account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tabs;

import React, { useContext, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import useGetProfile from "../../hooks/useFetchData";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const { data: delDoc } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/doctors/${delDoc._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
      localStorage.removeItem("token");
      window.location.reload();
    } catch (err) {
      // Handle errors, such as network errors or server errors
      toast.error(err.message);
    }
  };

  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <span className="md:hidden" onClick={toggleMenu}>
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex lg:flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md`}
        ref={menuRef}
      >
        <button
          onClick={() => {
            setTab("overview");
            toggleMenu(); // Close menu after clicking a tab
          }}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md mb-2`}
        >
          Overview
        </button>

        <button
          onClick={() => {
            setTab("appointments");
            toggleMenu(); // Close menu after clicking a tab
          }}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md mb-2`}
        >
          Appointments
        </button>

        <button
          onClick={() => {
            setTab("tests");
            toggleMenu(); // Close menu after clicking a tab
          }}
          className={`${
            tab === "tests"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md mb-2`}
        >
          Tests
        </button>

        <button
          onClick={() => {
            setTab("settings");
            toggleMenu(); // Close menu after clicking a tab
          }}
          className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md mb-2`}
        >
          Profile
        </button>

        <div className="mt-[100px] w-full">
          <button
            onClick={() => {
              handleLogout();
              toggleMenu(); // Close menu after clicking the button
            }}
            className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white mb-2"
          >
            Logout
          </button>
          <button
            onClick={() => {
              handleDelete();
              toggleMenu(); // Close menu after clicking the button
            }}
            className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;

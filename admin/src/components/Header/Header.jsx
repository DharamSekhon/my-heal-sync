import React from "react";
import { useEffect, useRef, useContext } from "react";
import logo from "../../assets/images/logo.png";

import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors-section",
    display: "Doctors",
  },
  {
    path: "/orders-section",
    display: "Orders",
  },
  {
    path: "/patients-section",
    display: "Patients",
  },
  {
    path: "/appointments-section",
    display: "Appointments",
  },
  {
    path: "/tests-section",
    display: "Tests",
  },

  {
    path: "/all-products",
    display: "Add Medicines",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toogleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header h-[5rem]  flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ============= logo ============== */}
          <div>
            <Link to={"/home"}>
              <img className=" h-[4rem]" src={logo} alt="" />
            </Link>
          </div>

          {/* =========== menu ================ */}
          <div className="navigation" ref={menuRef} onClick={toogleMenu}>
            <ul className="menu flex items-center gap-0 lg:gap-[2.7rem]  ">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[13px] leading-7 font-[600]"
                        : "text-textColor text-[13px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* =========== nav right ============ */}
          <div className="flex items-center gap-4">
            {token && user ? (
              // <div>
              //   <Link
              //     to={`${
              //       role === "doctor"
              //         ? "/doctors/profile/me"
              //         : "/users/profile/me"
              //     }`}
              //   >
              //     <figure className="w-[35px] h-[35px] rounded-full">
              //       <img
              //         src={user?.photo}
              //         className="w-full rounded-full"
              //         alt=""
              //       />
              //     </figure>
              //   </Link>
              // </div>

              <div className="flex items-center gap-2">
                <div>
                  <Link to="/admin/profile/me">
                    <p className="text-textColor text-[14px]  leading-7 font-[500] hover:text-primaryColor">
                      {user.name}
                    </p>
                  </Link>
                </div>
                <div>
                  <Link to="/admin/profile/me">
                    <figure className="w-[40px] h-[40px] rounded-full">
                      <img
                        src={user?.photo}
                        className="w-full rounded-full"
                        alt=""
                      />
                    </figure>
                  </Link>
                </div>
              </div>
            ) : null}

            <span className="md:hidden " onClick={toogleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

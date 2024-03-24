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
    path: "/doctors",
    display: "Find a Doctor",
  },
];

const navLinks2 = [
  {
    path: "/products",
    display: "Medicines",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
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
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ============= logo ============== */}
          <div>
            <Link to="/home">
              <img className="h-[3.5rem]" src={logo} alt="" />
            </Link>
          </div>

          {/* =========== menu ================ */}
          <div className="navigation" ref={menuRef} onClick={toogleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
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
              {role == "doctor" ? (
                <NavLink
                  to="/alltests"
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-primaryColor text-[13px] leading-7 font-[600]"
                      : "text-textColor text-[13px] leading-7 font-[500] hover:text-primaryColor"
                  }
                >
                  All Test
                </NavLink>
              ) : (
                <NavLink
                  to="/labs"
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-primaryColor text-[13px] leading-7 font-[600]"
                      : "text-textColor text-[13px] leading-7 font-[500] hover:text-primaryColor"
                  }
                >
                  Book a test
                </NavLink>
              )}

              {navLinks2.map((link, index) => (
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
                  <Link
                    to={`${
                      role === "doctor"
                        ? "/doctors/profile/me"
                        : "/users/profile/me"
                    }`}
                  >
                    <p className="text-textColor text-[14px] leading-7 font-[500]">
                      {user.name}
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={`${
                      role === "doctor"
                        ? "/doctors/profile/me"
                        : "/users/profile/me"
                    }`}
                  >
                    <figure className="w-[30px] h-[30px] rounded-full">
                      <img
                        src={user?.photo}
                        className="w-full rounded-full"
                        alt=""
                      />
                    </figure>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[38px] flex items-center justify-center rounded-[50px]">
                    Login
                  </button>
                </Link>
              </div>
            )}

            <span className="md:hidden" onClick={toogleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

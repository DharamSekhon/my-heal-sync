import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const socialLinks = [
  {
    path: "https://github.com/DharamSekhon",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-2 bg-white pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div className="">
            <img src={logo} className="h-[2rem]" alt="" />
            <p className="text-[11px] leading-7 font-[400] text-textColor ml-2">
              Copyright © {year} developed by Dharampreet Singh Sekhon all
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

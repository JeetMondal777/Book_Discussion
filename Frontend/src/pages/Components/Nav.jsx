import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsProfileOpenTrue, setIsProfileOpenFalse } from "../../redux/Slices/isProfileOpenSlice";
import ProfilePanel from "../panel/ProfilePanel";
import NavComponents from "./NavComponents";
import logoBody from "../../assets/images/logobody.png";
import woodBackground from "../../assets/images/image.png"; // Wooden background

const Nav = () => {
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state) => state.isProfileOpen.isProfileOpen);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      {/* Main Navbar with Wooden Theme */}
      <nav
        className="fixed w-[95%] lg:w-[90%] flex justify-between items-center top-4 left-1/2 transform -translate-x-1/2 shadow-4xl rounded-full px-6 py-2 transition-all duration-300 z-40"
        style={{
          background: `url(${woodBackground}) no-repeat center center / cover`,
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // Enhances wooden depth
          border: "3px solid #8B5A2B", // Dark wood border effect
        }}
      >
        {/* Logo */}
        <Link to="/">
          <img className="w-11 cursor-pointer" src={logoBody} alt="Logo" />
        </Link>

        {/* Menu Icon (for Mobile) */}
        <i 
          className="ri-align-justify text-3xl cursor-pointer lg:hidden text-amber-50 p-2 rounded-lg hover:bg-opacity-80 hover:text-amber-100 transition-all duration-300"
          onClick={() => setIsNavOpen(true)}
        ></i>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center space-x-6">
          {/* Direct Links */}
          <Link to="/" className="text-amber-50 font-bold transition-all duration-300 hover:text-amber-200">Home</Link>
          <Link to="/dashboard" className="text-amber-50 font-bold transition-all duration-300 hover:text-amber-200">Dashboard</Link>
          <Link to="" className="text-amber-50 font-bold transition-all duration-300 hover:text-amber-200">About</Link>
          <Link to="/uploadBook" className="text-amber-50 font-bold transition-all duration-300 hover:text-amber-200">Upload Book</Link>

          {/* Log In / Sign Up Button */}
          <Link 
            to="/loginUser"
            className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-amber-50 border-2 border-transparent hover:border-amber-50 px-4 py-2 rounded-full font-bold transition-all duration-400"
          >
            Log In / Sign Up
          </Link>

          {/* Profile Button */}
          <button 
            onClick={() => dispatch(isProfileOpen ? setIsProfileOpenFalse() : setIsProfileOpenTrue())}
            className="bg-amber-100 text-amber-900 px-2 py-1 rounded-full transition-all duration-400 hover:bg-amber-800 hover:text-amber-50 border-2 border-transparent hover:border-amber-50"
          >
            <i className="ri-user-line text-2xl"></i>
          </button>
        </div>
      </nav>

      {/* Profile Panel */}
      <ProfilePanel />

      {/* Sidebar Navigation (Mobile) */}
      <NavComponents isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
};

export default Nav;

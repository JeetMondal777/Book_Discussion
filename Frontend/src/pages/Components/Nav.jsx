import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate for navigation
import { useSelector, useDispatch } from "react-redux";
import { setIsProfileOpenTrue, setIsProfileOpenFalse } from "../../redux/Slices/isProfileOpenSlice";
import ProfilePanel from "../panel/ProfilePanel";
import NavComponents from "./NavComponents"; // Sidebar Component
import logoBody from "../../assets/images/logobody.png";

const Nav = () => {
  const navigate = useNavigate(); // ✅ Hook for programmatic navigation
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state) => state.isProfileOpen.isProfileOpen);
  const [isNavOpen, setIsNavOpen] = useState(false); // Sidebar state

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed bg-[#A9B8D9] w-full lg:w-[90%] flex justify-between items-center top-4 left-1/2 transform -translate-x-1/2 shadow-lg rounded-full px-6 py-2 transition-all duration-300 z-40">
        {/* Logo */}
        <img className="w-14 cursor-pointer" src={logoBody} alt="Logo" onClick={() => navigate("/")} />

        {/* Menu Icon (for Mobile) */}
        <i 
          className="ri-align-justify text-3xl cursor-pointer lg:hidden text-[#112332] p-2 rounded-lg hover:bg-gray-200 hover:text-[#112332] transition-all duration-300"
          onClick={() => setIsNavOpen(true)}
        ></i>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center space-x-6">
          <button onClick={() => navigate("/")} className="text-gray-700 font-bold transition-all duration-300 hover:text-[#112332]">
            Home
          </button>
          <button onClick={() => navigate("/dashboard")} className="text-gray-700 font-bold transition-all duration-300 hover:text-[#112332]">
            Dashboard
          </button>
          <button onClick={() => navigate("/about")} className="text-gray-700 font-bold transition-all duration-300 hover:text-[#112332]">
            About
          </button>
          <button onClick={() => navigate("/uploadBook")} className="text-gray-700 font-bold transition-all duration-300 hover:text-[#112332]">
            Upload Book
          </button>

          {/* Log In / Sign Up Button */}
          <button
            onClick={() => navigate("/loginUser")}
            className="bg-[#112332] text-white px-4 py-2 rounded-full font-bold transition-all duration-400 hover:bg-white hover:text-[#112332] border border-transparent hover:border-[#112332]"
          >
            Log In / Sign Up
          </button>

          {/* Profile Button */}
          <button 
            onClick={() => dispatch(isProfileOpen ? setIsProfileOpenFalse() : setIsProfileOpenTrue())}
            className="bg-[#112332] text-white px-2 py-1 rounded-full transition-all duration-400 hover:bg-white hover:text-[#112332] border border-transparent hover:border-[#112332]"
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

import React from "react";
import logoBody from "../../../public/images/logoBody.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsProfileOpenTrue, setIsProfileOpenFalse } from "../../redux/Slices/isProfileOpenSlice";
import { setUser } from "../../redux/Slices/userSlice";
import ProfilePanel from "../panel/ProfilePanel";


const Nav = () => {
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state) => state.isProfileOpen.isProfileOpen);
  const user = useSelector((state) => state.user.user);
  

  return (
    <div className="absolute">
      <nav className="fixed bg-[#A9B8D9] w-[90%] justify-between top-4 left-1/2 transform -translate-x-1/2 shadow-lg rounded-full px-6 py-2 flex items-center transition-all duration-300">
        <img className="w-13" src={logoBody} alt="" />
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-[#112332] font-bold transition-all duration-300 ">Home</Link>
          <Link to="/dashboard" className="text-gray-700 font-bold transition-all duration-300 hover:text-[#112332]">Dashboard</Link>
          <Link to="" className="text-gray-700 font-bold transition-all duration-300 hover:text-[#112332]">About</Link>
          <Link to="/uploadBook" className="text-gray-700 font-bold transition-all duration-300 hover:text-[#112332]">Upload Book</Link>
          <Link
            to="/loginUser"
            className="ml-auto bg-[#112332] text-white px-4 py-2 rounded-full font-bold transition-all duration-300 hover:bg-white hover:text-[#112332]"
          >
            Log In / Sign Up
          </Link>
          <button onClick={() => dispatch(isProfileOpen ? setIsProfileOpenFalse() : setIsProfileOpenTrue())}>
            <i className="ri-user-line cursor-pointer text-2xl bg-[#112332] text-white rounded-full p-1 transition-all duration-300 hover:bg-white hover:text-[#112332]"></i>
          </button>
        </div>
      </nav>

      {/* Profile Panel */}
      <ProfilePanel />
    </div>
  );
};

export default Nav;

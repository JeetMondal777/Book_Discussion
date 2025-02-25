import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { setIsProfileOpenTrue, setIsProfileOpenFalse } from "../../redux/Slices/isProfileOpenSlice";

const NavComponents = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state) => state.isProfileOpen.isProfileOpen);

  // Handle sidebar animation
  useEffect(() => {
    if (isOpen) {
      gsap.to(sidebarRef.current, { 
        x: 0, 
        duration: 0.5, 
        ease: "power2.out"
      });
    } else {
      gsap.to(sidebarRef.current, { 
        x: "100%", 
        duration: 0.5, 
        ease: "power2.in"
      });
    }
  }, [isOpen]);

  // Toggle Profile Panel instead of redirecting
  const handleProfileClick = () => {
    dispatch(isProfileOpen ? setIsProfileOpenFalse() : setIsProfileOpenTrue());
    onClose(); // Close sidebar after clicking
  };

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed    z-40 transition-all duration-400"></div>
      )}

      {/* Sidebar with Yellowish Blur */}
      <div 
        ref={sidebarRef} 
        className="fixed rounded-l-xl top-0 right-0 h-screen w-3/4 max-w-xs bg-yellow-200/10 backdrop-blur-lg shadow-lg p-5 flex flex-col transform translate-x-full z-50 transition-all duration-500"
      >
        {/* Close Button */}
        <button onClick={onClose} className="text-white text-3xl self-end">
          <i className="ri-close-line cursor-pointer hover:text-gray-300 transition"></i>
        </button>

        {/* Navigation Links */}
        <nav className="mt-10 space-y-6 text-white">
          <Link to="/" className="block text-lg font-semibold hover:text-gray-300 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg">Home</Link>
          <Link to="/dashboard" className="block text-lg font-semibold hover:text-gray-300 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg">Dashboard</Link>
          <Link to="#" className="block text-lg font-semibold hover:text-gray-300 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg">About</Link>
          <Link to="/uploadBook" className="block text-lg font-semibold hover:text-gray-300 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg">Upload Book</Link>
          <Link to="/loginUser" className="block text-lg font-semibold hover:text-gray-300 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg">Log In / Sign Up</Link>

          {/* Profile Icon - Now Opens Profile Panel */}
          <button onClick={handleProfileClick} className="w-full flex items-center justify-start text-lg font-semibold bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg hover:text-gray-300 transition">
            <i className="ri-user-line text-xl mr-2"></i> Profile
          </button>
        </nav>
      </div>
    </>
  );
};

export default NavComponents;

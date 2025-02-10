import React from "react";
import logo from "../../public/images/logo.png";
import { Link } from "react-router-dom";
import Nav from "./Components/Nav";

const LandingPage = () => {
  return (
    
    <div className="min-h-screen flex items-center justify-center  bg-[#A9B8D9] text-white p-10 w-full">

    <Nav/>  
      {/* Left Side - Logo */}
      <div className="w-[40%] flex justify-center">
        <img src={logo} alt="My Library Logo" className="w-[90%] " />
      </div>

      {/* Right Side - Text Content */}
      <div className="w-[60%] flex flex-col items-center justify-start ">
        <h1 className="text-5xl text-[#112332] font-bold mb-4">Let's Learn Something Crazy</h1>
        <p className="text-lg px-20 text-[#08273F] mb-6">
        Welcome to My Library, where learning and earning go hand in hand. Our platform is designed for readers, students, and knowledge seekers who want to grow while being rewarded for their efforts. Explore a vast collection of books, articles, and educational content that enhances your skills and expands your mind. As you read and engage, you unlock new opportunities. Unlike traditional platforms, My Library values your time and dedication to learning. Start your journey today. Read more, learn more, and achieve more with My Library.
        </p>
        <Link to="/dashboard" className="px-10  py-3 bg-[#D2C6B9] text-[#112332] font-bold rounded-lg shadow-lg hover:bg-gray-200 transition">
          Start Reading
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

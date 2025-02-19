import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import Nav from "./Components/Nav";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#A9B8D9] text-white px-6 py-10">
      <Nav />

      {/* Add margin-top to fix logo issue */}
      <div className="mt-20 flex flex-col lg:flex-row items-center w-full max-w-6xl">
        {/* Left Side - Logo */}
        <div className="w-full lg:w-2/5 flex justify-center mb-6 lg:mb-0">
          <img src={logo} alt="My Library Logo" className="w-3/4 max-w-xs lg:max-w-full" />
        </div>

        {/* Right Side - Text Content */}
        <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl text-[#112332] font-bold mb-4">
            Let's Learn Something Crazy
          </h1>
          <p className="text-base md:text-lg text-[#08273F] mb-6 px-4 lg:px-0">
            Welcome to <b>My Library</b>, where learning and earning go hand in hand. Our platform
            is designed for readers, students, and knowledge seekers who want to grow while being
            rewarded for their efforts. Explore a vast collection of books, articles, and
            educational content that enhances your skills and expands your mind. Start your journey
            today. <b>Read more, learn more, and achieve more with My Library.</b>
          </p>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-[#D2C6B9] text-[#112332] font-bold rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Start Reading
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

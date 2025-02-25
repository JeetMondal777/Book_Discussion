import React from 'react';
import { Link } from 'react-router-dom';

const NotProfileCard = () => {
  return (
    <div className=" relative mt-10 rounded-l-xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] text-white flex flex-col justify-center items-center p-5">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 blur-2xl opacity-30 rounded-xl"></div>

      {/* Card Content */}
      <div className="relative flex flex-col justify-center items-center w-full  bg-opacity-90 rounded-xl ">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5 text-center">Log In First!</h1>
        <i className="ri-user-line text-8xl md:text-9xl bg-amber-200 text-black p-2 rounded-full font-medium"></i>

        <Link 
          to="/loginUser" 
          className="w-[80%] sm:w-[70%] md:w-[60%] bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-amber-50 border-2 border-transparent hover:border-amber-50 px-4 py-2  font-bold transition-all duration-400  rounded-xl text-center md:text-base px-3 py-2 mb-10 mt-10"
        >
          Log In ? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default NotProfileCard;

import React from 'react';
import { Link } from 'react-router-dom';

const NotProfileCard = () => {
  return (
    <div className="bg-[#112332] mt-10 rounded-l-xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] text-white flex flex-col justify-center items-center p-5">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5 text-center">Log In First!</h1>
        <i className="ri-user-line text-8xl md:text-9xl bg-white text-black p-2 rounded-full font-medium"></i>

        <Link to="/loginUser" className="w-[80%] sm:w-[70%] md:w-[60%] rounded-xl text-center font-semibold text-sm md:text-base bg-[#112332] border-2 border-white transition-all duration-300 hover:bg-white hover:text-[#112332] px-3 py-2 mb-10 mt-10">
          Log In ? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default NotProfileCard;

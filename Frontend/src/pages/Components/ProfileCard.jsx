import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../redux/Slices/userSlice';

const ProfileCard = () => {
  const [formattedDate, setFormattedDate] = useState("N/A");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(clearUser()); // Clear user data on logout
    navigate('/userLogout');
  };

  useEffect(() => {
    if (user && user.createdAt) {
      const date = new Date(user.createdAt);
      if (!isNaN(date.getTime())) {
        setFormattedDate(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
      }
    }
  }, [user]); // Runs when user data updates

  return (
    <div className="relative mt-5 rounded-l-xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] text-white flex flex-col justify-center items-center p-6">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 blur-2xl opacity-30 rounded-xl"></div>

      {/* Card Content */}
      <div className="relative flex flex-col justify-center items-center w-full  bg-opacity-90 rounded-xl  ">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-amber-100 mb-5 text-center">
          {user?.fullname?.firstname} {user?.fullname?.lastname}
        </h1>
        <div className="w-[80%] md:w-[70%] lg:w-[60%]">
          <img src={user.coverImage} className="rounded-full w-full h-auto object-cover" alt="" />
        </div>
        <div className="flex flex-col w-full text-left">
          <p className="mt-5 text-sm md:text-base ml-2 mb-1 font-semibold">Your Email</p>
          <h3 className="font-semibold text-sm md:text-base bg-white/10 ml-1 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg w-[95%] px-3 py-2 mb-3">
            {user?.email || "N/A"}
          </h3>

          <p className="mt-5 text-sm md:text-base ml-2 mb-1 font-semibold">Accounts</p>
          <h3 className="font-semibold text-sm md:text-base bg-white/10 ml-1 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg w-[95%] px-3 py-2">
            Member Since <span className="text-amber-900 ml-12">{formattedDate}</span>
          </h3>

          <Link to="/uploadBook" className="flex justify-center items-center">
            <h3 className="w-[95%] bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-amber-50 border-2 border-transparent hover:border-amber-50 rounded-xl text-center font-semibold text-sm md:text-base transition-all duration-300 cursor-pointer px-3 py-2 mb-4 mt-4">
              Upload A Book
            </h3>
          </Link>

          <h3
            onClick={handleLogout}
            className="text-center hover:bg-red-600 border-2 hover:border-white transition-all duration-300 font-semibold text-sm md:text-base bg-white/10 ml-1 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg w-[95%] px-3 py-2 mb-5 cursor-pointer"
          >
            Log Out
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

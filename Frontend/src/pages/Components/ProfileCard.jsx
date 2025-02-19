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
    <div className="bg-[#112332] mt-5 rounded-l-xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] text-white flex flex-col justify-center items-center p-">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5 text-center">
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
            Member Since <span className="text-green-600 ml-8">{formattedDate}</span>
          </h3>

          <Link to="/uploadBook" className="flex justify-center items-center">
            <h3 className="w-[95%] rounded-xl text-center font-semibold text-sm md:text-base bg-[#112332] border-2 border-white transition-all duration-300 hover:bg-white cursor-pointer hover:text-[#112332] px-3 py-2 mb-4 mt-4">
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

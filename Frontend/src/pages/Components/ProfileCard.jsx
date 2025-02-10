import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { clearUser } from '../../redux/Slices/userSlice';


const ProfileCard = () => {
  //const user = useSelector((state) => state.user.user);
  const [formattedDate, setFormattedDate] = useState("N/A");
  const dispatch= useDispatch()
  const navigate = useNavigate()

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
    <div className='bg-[#112332] mt-10 rounded-l-xl w-full text-white flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center w-full'>
        <h1 className='font-bold text-xl mb-5'>
          {user?.fullname?.firstname} {user?.fullname?.lastname}
        </h1>
        <div className=' w-[70%] '>
          <img src={user.coverImage} className='rounded-full' alt="" />
        </div>
        <div className='flex flex-col w-full text-left'>
          <p className='mt-5 text-sm ml-2 mb-1 font-semibold'>Your Email</p>
          <h3 className='font-semibold text-sm bg-white/10 ml-1 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg mr-auto w-[95%] px-3 py-2 mb-3'>
            {user?.email || "N/A"}
          </h3>

          <p className='mt-5 text-sm ml-2 mb-1 font-semibold'>Accounts</p>
          <h3 className='font-semibold text-sm bg-white/10 ml-1 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg mr-auto w-[95%] px-3 py-2'>
            Member Since <span className='text-green-600 ml-8'>{formattedDate}</span>
          </h3>

          <Link to="/uploadBook" className='flex justify-center items-center'>
            <h3 className='w-[95%] rounded-xl text-center font-semibold text-sm bg-[#112332] border-2 border-white transition-all duration-300 hover:bg-white cursor-pointer hover:text-[#112332] px-3 py-2 mb-4 mt-4'>
              Upload A Book
            </h3>
          </Link>

          <h3
          onClick={handleLogout}
          className='text-center hover:bg-red-600 border-2 hover:border-white transition-all duration-300 font-semibold text-sm bg-white/10 ml-1 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg mr-auto w-[95%] px-3 py-2 mb-5 cursor-pointer'>
            Log Out
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

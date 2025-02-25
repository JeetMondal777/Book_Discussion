import React, { useState } from 'react';
import Nav from './Components/Nav';
import BookCard from './Components/BookCard';
import { setSearchQuery } from '../redux/Slices/searchSlice';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    dispatch(setSearchQuery(e.target.value)); // Dispatch query to Redux store
  };

  return (
    <div className=" min-h-screen flex flex-col items-center px-4">
      {/* Navbar */}
      <Nav />

      {/* Search Input */}
      <input 
        placeholder="Search Your Book" 
        value={searchInput}
        onChange={handleSearchChange}
        className="w-full text-left sm:w-3/4 md:w-[50%] lg:w-[40%] placeholder:text-left placeholder:font-bold font-bold mt-28 border-amber-200 focus:outline-none border-2 mb-4 px-4 pr-8 py-3 rounded-xl bg-transparent text-amber-500 placeholder-amber-500 text-center"
      />

      {/* Heading */}
      <h1 className="text-xl sm:text-2xl font-bold p-5 text-amber-200 text-center">All Available Books</h1>

      {/* Books Grid */}
      <div className="flex overflow-y-auto scrollbar-hide flex-wrap justify-center items-center gap-6 w-full sm:w-[100%] md:w-[100%] lg:w-[100%]">
        <BookCard />
      </div>


    </div>
  );
};

export default Dashboard;

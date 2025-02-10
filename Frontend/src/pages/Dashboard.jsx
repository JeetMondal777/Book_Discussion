import React, { useState } from 'react'
import Nav from './Components/Nav'
import BookCard from './Components/BookCard'
import { setSearchQuery } from '../redux/Slices/searchSlice'
import { useDispatch } from 'react-redux'

const Dashboard = () => {

   const dispatch = useDispatch()
   const [searchInput, setSearchInput] = useState('');

   const handleSearchChange = (e) => {
     setSearchInput(e.target.value);
     dispatch(setSearchQuery(e.target.value)); // Dispatch query to Redux store
   };
   
    
  return (
    <div className='bg-[#A9B8D9] h-screen flex flex-col items-center'>
        <Nav/>
        <input placeholder='Search Your Book' 
        value={searchInput}
        onChange={handleSearchChange}
        className='w-[40%] placeholder:text-left placeholder:font-bold font-bold mt-28  border-black focus:outline-none border-2 mb-4 px-4 pr-32 py-4 rounded-xl bg-transparent placeholder-zinc-700'/>
        <h1 className=' text-2xl font-bold p-5 text-[#112332]'>All Available Books </h1>
        <div className='flex flex-wrap  w-[97%] '>
            <BookCard/>
            
        </div>
    </div>
  )
}

export default Dashboard
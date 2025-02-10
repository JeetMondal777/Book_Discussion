import React from 'react'
import { Link } from 'react-router-dom'

const NotProfileCard = ()=>{
    return (
        <div className='bg-[#112332] mt-10 h-1/3  rounded-l-xl w-full text-white flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-full'>
        <h1 className='font-bold text-xl mb-5'>Log In First!</h1>
        <i className="ri-user-line text-8xl bg-white text-black p-2  rounded-full font-medium"></i>
        
        <Link to="/loginUser" className=' w-[70%] rounded-xl text-center font-semibold text-sm mt-5 bg-[#112332] border-2 border-white transition-all duration-300 hover:bg-white  hover:text-[#112332] px-3 py-2 mb-10 mt-20'>Log In ? Sign Up</Link>

        </div>
        <hr />
        
    </div>
    )
}

export default NotProfileCard
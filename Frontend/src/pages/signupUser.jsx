import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import toast

const SignupUser = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Image file
  const [imageUrl, setImageUrl] = useState(""); // Cloudinary URL
  const [isSigningIn, setIsSigningIn] = useState(false);
  
  
  const navigate = useNavigate();

  // Upload image to Cloudinary
  const uploadImage = async () => {
    if (!profileImage) return;

    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", "Book Discussion"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dy3noysat");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dy3noysat/image/upload", formData);
      setImageUrl(response.data.url); // Store the Cloudinary image URL
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed. Please try again.", {
        position: 'top-center',
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check for missing fields
    if (!firstname || !lastname || !email || !pass) {
      toast.error("All fields are required", {
        position: 'top-center',
      });
      return;
    }

    // Check password length
    if (pass.length < 6) {
      toast.error("Password length should be 6 or more characters", {
        position: 'top-center',
      });
      return;
    }

    const uploadedImageUrl = await uploadImage(); // Upload image first

    if (!uploadedImageUrl) return;

    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: pass,
      coverImage: uploadedImageUrl, // Store Cloudinary URL
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data;
        
        localStorage.setItem("token", data.token);
        toast.success("Registration Successful!", {
          position: 'top-center',
        });
        navigate("/loginUser");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setIsSigningIn(false)
      toast.error("Internal error, please try again", {
        position: 'top-center',
      });
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPass("");
    setProfileImage(null);
  };

  return (
    <div className='w-full bg-[#A9B8D9] flex flex-col justify-center items-center gap-5 h-screen'>
      <form className='flex flex-col items-center justify-center' onSubmit={submitHandler}>
        <h1 className='font-semibold text-xl tracking-wider mb-3'>Sign Up As User</h1>
        <input
          name='firstname'
          required
          type="text"
          placeholder='First Name'
          className='mb-3 w-full border-2 px-4 py-4 rounded-xl'
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          name='lastname'
          required
          type="text"
          placeholder='Last Name'
          className='mb-3 w-full border-2 px-4 py-4 rounded-xl'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          name='email'
          required
          type="email"
          placeholder='Email'
          className='mb-3 w-full border-2 px-4 py-4 rounded-xl'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name='password'
          required
          type="password"
          placeholder='Password'
          className='mb-3 w-full border-2 px-4 py-4 rounded-xl'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
          className='mb-3  w-full border-2 px-4 py-3 rounded-xl'
        />
        
<button
  onClick={() => {
    if (firstname === "" || email === "" || pass === "" || profileImage === null ) {
      toast.error("All fields are required!", { position: "top-center" });
      return;
    }
    
    setIsSigningIn(true);
  }}
  type="submit"
  className="w-full flex items-center justify-center text-white font-bold hover:border-black focus:outline-none py-4 rounded-xl bg-black hover:bg-white hover:text-[#112332] transition-all duration-300 hover:border-2"
>
  {isSigningIn ? (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    "Sign Up"
  )}
</button>
      </form>
      <div className='flex justify-center items-center w-[100%]'>
        <Link to="/loginUser" className='w-full text-black font-semibold text-center'>
          Already have an account? <span className='text-blue-500 ml-1'>Log in here</span>
        </Link>
      </div>
    </div>
  );
};

export default SignupUser;

//className='w-full bg-black text-xl text-white py-4 rounded-xl font-bold'

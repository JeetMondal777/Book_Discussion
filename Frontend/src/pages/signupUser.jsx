import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"; 

const SignupUser = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profileImage, setProfileImage] = useState(null); 
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();

  // Upload image to Cloudinary
  const uploadImage = async () => {
    if (!profileImage) return;

    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", "Book Discussion");
    formData.append("cloud_name", "dy3noysat");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dy3noysat/image/upload",
        formData
      );
      return response.data.url; 
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed. Please try again.", { position: "top-center" });
      return null;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSigningIn(true); 

    if (!firstname || !lastname || !email || !pass || !profileImage) {
      toast.error("All fields are required", { position: "top-center" });
      setIsSigningIn(false);
      return;
    }

    if (pass.length < 6) {
      toast.error("Password must be at least 6 characters", { position: "top-center" });
      setIsSigningIn(false);
      return;
    }

    const uploadedImageUrl = await uploadImage();
    if (!uploadedImageUrl) {
      setIsSigningIn(false);
      return;
    }

    const newUser = {
      fullname: { firstname, lastname },
      email,
      password: pass,
      coverImage: uploadedImageUrl,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        toast.success("Registration Successful!", { position: "top-center" });
        navigate("/loginUser");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Internal error, please try again", { position: "top-center" });
    }

    setIsSigningIn(false);
    setFirstname("");
    setLastname("");
    setEmail("");
    setPass("");
    setProfileImage(null);
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center px-4"
      
    >
      <form
        className="flex flex-col w-full max-w-md p-6  backdrop-blur-lg border border-amber-600 rounded-xl shadow-lg"
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl font-bold text-center text-amber-200 mb-4">
          Sign Up As User
        </h1>

        <input
          type="text"
          placeholder="First Name"
          className="w-full border border-amber-600 px-4 py-3 rounded-xl bg-transparent placeholder-amber-400 text-white mb-3 focus:outline-none"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full border border-amber-600 px-4 py-3 rounded-xl bg-transparent placeholder-amber-400 text-white mb-3 focus:outline-none"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-amber-600 px-4 py-3 rounded-xl bg-transparent placeholder-amber-400 text-white mb-3 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-amber-600 px-4 py-3 rounded-xl bg-transparent placeholder-amber-400 text-white mb-3 focus:outline-none"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        <p className="text-amber-200 ml-1 font-semibold mb-2">Choose Your Profile Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
          className="w-full border border-amber-600 px-4 py-3 rounded-xl bg-transparent text-white focus:outline-none mb-3"
          required
        />

        <button
          type="submit"
          className="w-full text-white font-bold border border-amber-600 focus:outline-none py-3 rounded-xl bg-amber-700 hover:bg-amber-800 transition-all duration-300 flex items-center justify-center"
        >
          {isSigningIn ? (
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-amber-300 animate-spin"
                viewBox="0 0 100 101"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
              </svg>
              <span className="ml-2">Signing Up...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <Link to="/loginUser" className="mt-4 text-white font-semibold">
        Already have an account?
        <span className="text-amber-300 ml-1 hover:text-amber-400 transition-all duration-300">
          Log in here
        </span>
      </Link>
    </div>
  );
};

export default SignupUser;

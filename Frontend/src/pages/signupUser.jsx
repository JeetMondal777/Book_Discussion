import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import toast

const SignupUser = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Image file
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
      return response.data.url; // Store the Cloudinary image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed. Please try again.", { position: "top-center" });
      return null;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSigningIn(true); // Start loading

    // Validate input fields
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
    <div className="w-full min-h-screen bg-[#A9B8D9] flex flex-col justify-center items-center px-4">
      <form
        className="flex flex-col w-full max-w-md  p-6 "
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up As User</h1>

        <input
          type="text"
          placeholder="First Name"
          className="w-full border-2 border-black px-4 py-3 rounded-xl mb-3"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full border-2 border-black px-4 py-3 rounded-xl mb-3"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border-2 border-black px-4 py-3 rounded-xl mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-2 border-black px-4 py-3 rounded-xl mb-3"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        <p className="font-semibold mb-2">Choose Your Profile Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
          className="w-full border-2 border-black px-4 py-3 rounded-xl mb-3"
          required
        />

        <button
          type="submit"
          className="w-full text-white font-bold bg-black py-3 rounded-xl hover:bg-white hover:text-black border-2 hover:border-black transition-all duration-300 flex items-center justify-center"
        >
          {isSigningIn ? (
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071"
                  fill="currentFill"
                />
              </svg>
              <span className="ml-2">Signing Up...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <Link to="/loginUser" className="mt-4 text-black font-semibold">
        Already have an account? <span className="text-blue-500">Log in here</span>
      </Link>
    </div>
  );
};

export default SignupUser;

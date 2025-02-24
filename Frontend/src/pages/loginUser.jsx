import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [guest, setGuest] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (pass.length < 6) {
      toast.error("Invalid Email Or Password", { position: 'top-center' });
      return;
    }
  
    const loginData = guest
      ? { email: "jeetmn0226@gmail.com", password: "123456" }
      : { email, password: pass };
  
    if (!loginData.email || !loginData.password) {
      console.error("Email and password are required");
      return;
    }
  
    setIsLoggingIn(true); // Start loading
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginData);
  
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
  
        const profileResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
  
        if (profileResponse.status === 200) {
          const userProfile = profileResponse.data;
          localStorage.setItem("user", JSON.stringify(userProfile));
          dispatch(setUser(userProfile));
          navigate("/");
  
          toast.success("Login Successful!", { position: 'top-center' });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid Email Or Password", { position: 'top-center' });
      setIsLoggingIn(false);
    } finally {
      setIsLoggingIn(false); // Stop loading in both success and error cases
    }
  
    if (!guest) {
      setEmail("");
      setPass("");
    }
  };
  

  return (
    <div className="w-full min-h-screen bg-[#A9B8D9] flex flex-col justify-center items-center px-4 sm:px-6">
      <form className="flex flex-col items-center justify-center w-full max-w-sm  p-6  "
        onSubmit={submitHandler}
      >
        <h1 className="font-semibold text-2xl sm:text-lg tracking-wider mb-4 text-center">
          Login As User
        </h1>

        <input
          name="email"
          required
          type="email"
          placeholder="Enter Your Email"
          className="w-full border-2 border-black focus:outline-none mb-4 px-4 py-3 rounded-xl bg-transparent placeholder-zinc-700 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          name="password"
          required
          type={guest ? "text" : "password"}
          placeholder="Enter Your Password"
          className="w-full border-2 border-black focus:outline-none mb-4 px-4 py-3 rounded-xl bg-transparent placeholder-zinc-700 sm:text-sm"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          onClick={() => {
            if (email === "" || pass === "") {
              toast.error("All fields are required!", { position: "top-center" });
              return;
            }
            setIsLoggingIn(true);
          }}
          type="submit"
          className="w-full text-white font-bold border-black focus:outline-none py-3 rounded-xl bg-black hover:bg-white hover:text-black transition-all duration-300 border-2 flex items-center justify-center"
        >
          {isLoggingIn ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            </div>
          ) : (
            "Log In"
          )}
        </button>

        <p
          onClick={() => {
            setGuest(true);
            setEmail("jeetmn0226@gmail.com");
            setPass("123456");
          }}
          className="w-full text-center bg-white border-2 border-black text-sm text-black py-3 rounded-xl mt-3 font-semibold cursor-pointer"
        >
          Login as guest
        </p>
      </form>

      <Link to="/signupUser" className="mt-4 text-black font-semibold">
        Don't have an account? <span className="text-blue-500 ml-1">Sign up here</span>
      </Link>
    </div>
  );
};

export default UserLogin;

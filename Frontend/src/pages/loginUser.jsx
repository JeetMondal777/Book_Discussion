import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Slices/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
//import woodBackground from "../assets/images/woodBackground.jpg"; // Add your wooden texture image

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
      toast.error("Invalid Email Or Password", { position: "top-center" });
      return;
    }

    const loginData = guest
      ? { email: "jeetmn0226@gmail.com", password: "123456" }
      : { email, password: pass };

    if (!loginData.email || !loginData.password) {
      console.error("Email and password are required");
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        loginData
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);

        const profileResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: { Authorization: `Bearer ${data.token}` },
          }
        );

        if (profileResponse.status === 200) {
          const userProfile = profileResponse.data;
          localStorage.setItem("user", JSON.stringify(userProfile));
          dispatch(setUser(userProfile));
          navigate("/");

          toast.success("Login Successful!", { position: "top-center" });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid Email Or Password", { position: "top-center" });
      setIsLoggingIn(false);
    } finally {
      setIsLoggingIn(false);
    }

    if (!guest) {
      setEmail("");
      setPass("");
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6"
      
    >
      {/* Glassmorphic Form Card */}
      <form
        className="flex flex-col items-center justify-center w-full max-w-sm p-6  backdrop-blur-lg border border-amber-600 rounded-xl shadow-lg"
        onSubmit={submitHandler}
      >
        <h1 className="font-bold text-2xl tracking-wider mb-4 text-center text-amber-200">
          Login As User
        </h1>

        <input
          name="email"
          required
          type="email"
          placeholder="Enter Your Email"
          className="w-full border border-amber-600 focus:outline-none mb-4 px-4 py-3 rounded-xl bg-transparent placeholder-amber-200 text-amber-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          name="password"
          required
          type={guest ? "text" : "password"}
          placeholder="Enter Your Password"
          className="w-full border border-amber-600 focus:outline-none mb-4 px-4 py-3 rounded-xl bg-transparent placeholder-amber-200 text-amber-200"
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
          className="w-full text-white font-bold border border-amber-600 focus:outline-none py-3 rounded-xl bg-amber-700 hover:bg-amber-800 transition-all duration-300 flex items-center justify-center"
        >
          {isLoggingIn ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-amber-300 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
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
          className="w-full text-center bg-amber-600 text-sm text-white py-3 rounded-xl mt-3 font-semibold cursor-pointer hover:bg-amber-700 transition-all duration-300"
        >
          Login as Guest
        </p>
      </form>

      <Link to="/signupUser" className="mt-4 text-white font-semibold">
        Don't have an account?
        <span className="text-amber-300 ml-1 hover:text-amber-400 transition-all duration-300">
          Sign up here
        </span>
      </Link>
    </div>
  );
};

export default UserLogin;

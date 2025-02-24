import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginUser from "./pages/loginUser";
import SignupUser from "./pages/signupUser";
import Home from "./pages/Home";
import AuthProtector from "./pages/Auth/AuthProtector";
import Dashboard from "./pages/Dashboard";
import ProfilePanel from "./pages/panel/ProfilePanel";
import UploadBook from "./pages/UploadBook";
import FullBookPage from "./pages/Components/FullBookPage";
import BookDiscussion from "./pages/panel/BookDiscussion";
import LogoutUser from "./pages/LogOutUser";
import { Toaster } from "react-hot-toast"; 
import MsgPanel from "./pages/panel/MsgPanel";
import ReviewPanel from "./pages/panel/reviewPanel";
import Reviews from "./pages/Reviews";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/loginUser" element={<LoginUser />} />
        <Route path="/signupUser" element={<SignupUser />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <AuthProtector>
              <Dashboard />
            </AuthProtector>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthProtector>
              <ProfilePanel />
            </AuthProtector>
          }
        />
        <Route
          path="/uploadBook"
          element={
            <AuthProtector>
              <UploadBook />
            </AuthProtector>
          }
        />
        <Route
          path="/bookDetails"
          element={
            <AuthProtector>
              <FullBookPage />
            </AuthProtector>
          }
        />
        <Route
          path="/bookDiscussion"
          element={
            <AuthProtector>
              <BookDiscussion />
            </AuthProtector>
          }
        />
        <Route
          path="/userLogout"
          element={
            <AuthProtector>
              <LogoutUser />
            </AuthProtector>
          }
        />
        <Route
          path="/review"
          element={
            <AuthProtector>
              <Reviews/>
            </AuthProtector>
          }
        />
        <Route
          path="/msg"
          element={
            <AuthProtector>
              <MsgPanel />
            </AuthProtector>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

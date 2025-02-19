import React, { useRef, useLayoutEffect } from "react";
import ProfileCard from "../Components/ProfileCard";
import NotProfileCard from "../Components/NotProfileCard";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { setIsProfileOpenFalse } from "../../redux/Slices/isProfileOpenSlice";

const ProfilePanel = () => {
  const dispatch = useDispatch();
  const profilePanelRef = useRef(null);
  const isProfileOpen = useSelector((state) => state.isProfileOpen.isProfileOpen);

  useLayoutEffect(() => {
    if (profilePanelRef.current) {
      gsap.to(profilePanelRef.current, {
        x: isProfileOpen ? "0%" : "100%", // Moves the panel in/out
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [isProfileOpen]);

  const token = localStorage.getItem("token");

  return (
    <div
      ref={profilePanelRef}
      className="fixed top-0 right-0 w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%] h-screen flex flex-col justify-start items-center bg-[#112332] shadow-lg rounded-l-xl z-50 p-5"
    >
      {/* Close Button */}
      <i
        onClick={() => dispatch(setIsProfileOpenFalse())}
        className="ri-close-line text-2xl font-bold text-white absolute top-3 right-3 cursor-pointer"
      ></i>

      {/* Show ProfileCard if logged in, else show NotProfileCard */}
      {token ? <ProfileCard /> : <NotProfileCard />}
    </div>
  );
};

export default ProfilePanel;

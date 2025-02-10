import React, { useRef, useLayoutEffect } from "react";
import ProfileCard from "../Components/ProfileCard";
import NotProfileCard from "../Components/NotProfileCard";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { setIsProfileOpenFalse } from "../../redux/Slices/isProfileOpenSlice";

const ProfilePanel = () => {

    const dispatch = useDispatch()
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
      className="fixed top-0 right-0 mt-6 w-1/6 flex flex-col justify-start items-center bg-[#112332] shadow-lg rounded-l-xl z-50"
    >
      <i
      onClick={()=>dispatch(setIsProfileOpenFalse())}
      className="ri-logout-box-r-line text-2xl font-bold text-white absolute top-2 right-2 cursor-pointer"></i>
      {token ? <ProfileCard /> : <NotProfileCard />}
    </div>
  );
};

export default ProfilePanel;

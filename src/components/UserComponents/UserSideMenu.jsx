import { RiMenuSearchFill } from "react-icons/ri";
import { BiTrip } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
export default function UserSideMenu({ selected, setMenu }) {
  return (
    <div className="bg-[#F2F3FD] h-full ">
      <div className={`flex gap-2 p-3 items-center `}>
        <div className="rounded-full text-white  w-10 h-10 items-center justify-center flex bg-blue-400">
          N
        </div>
        <p className="text-[#191C23] font-medium">Username</p>
      </div>
      <div
        onClick={() => {
          setMenu("home");
        }}
        className={`flex gap-3 items-center m-3 ${selected == "home" ? "bg-white text-[#005BBF] rounded-3xl" : " text-[#414754]"}`}
      >
        <div className="p-3 ">
          <RiMenuSearchFill size={25} />
        </div>
        <p className="font-medium text-[18px]">OVERVIEW</p>
      </div>
      <div
        onClick={() => {
          setMenu("trip");
        }}
        className={`flex gap-3 items-center m-3 ${selected == "trip" ? "bg-white text-[#005BBF]" : " text-[#414754]"}`}
      >
        <div className="p-3 ">
          <BiTrip size={25} />
        </div>
        <p className="font-medium text-[18px]">TRIP HISTORY</p>
      </div>
      <div
        onClick={() => {
          setMenu("settings");
        }}
        className={`flex gap-3 items-center m-3 ${selected == "settings" ? "bg-white text-[#005BBF]" : " text-[#414754]"}`}
      >
        <div className="p-3 ">
          <IoIosSettings size={25} />
        </div>
        <p className="font-medium text-[18px]">SETTINGS</p>
      </div>
    </div>
  );
}

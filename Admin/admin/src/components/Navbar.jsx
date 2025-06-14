import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { setDToken, dToken } = useContext(DoctorContext);
  const handeleLogout = () => {
    aToken && setAToken("");
    aToken && localStorage.setItem("aToken", "");
    dToken && setDToken("");
    dToken && localStorage.setItem("dToken","");
  };
  return (
    <div className=" flex justify-between items-center px-4 sm:px-10 py-3 border-b-2 border-gray-400 ">
      <div className="h-[47px]  w-[317px] text-black flex gap-2 ">
        <img className="h-[46px] w-[217px]" src={assets.admin_logo} alt="" />
        <p className="border items-center flex px-5  rounded-full border-gray-500 text-md">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      <button onClick={() => handeleLogout()} className="btn">
        Logout
      </button>
    </div>
  );
};

export default Navbar;

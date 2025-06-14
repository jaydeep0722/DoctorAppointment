import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <div className="h-[100vh] sm:min-w-[300px] min-w-[40px]  bg-white  p-3 border-gray-400 border-r-2">
          <div className="flex m-2 p-4 items-center text-gray-600  font-semibold gap-4 hover:bg-gray-200">
            <img
              className="h-[60px] w-[40px] gap-2"
              src={assets.home_icon}
              alt=""
            />
            <Link to={"/Dashboard"} className="hidden sm:block">
              Dashboard
            </Link>
          </div>

          <div className="flex m-2 p-4 items-center text-gray-600 font-semibold gap-4 hover:bg-gray-200">
            <img
              className="h-[60px] w-[40px] gap-2 "
              src={assets.appointment_icon}
              alt=""
            />
            <Link className="hidden sm:block" to={"/Appointments"}>
              Appointments
            </Link>
          </div>

          <div className="flex m-2 p-4 items-center text-gray-600 font-semibold gap-4 hover:bg-gray-200">
            <img
              className="h-[60px] w-[40px] gap-2"
              src={assets.add_icon}
              alt=""
            />
            <Link className="hidden sm:block" to={"/AddDoctor"}>
              AddDoctor
            </Link>
          </div>

          <div className="flex m-2 p-4 items-center text-gray-600 font-semibold gap-4 hover:bg-gray-200">
            <img
              className="h-[60px] w-[40px] gap-2"
              src={assets.people_icon}
              alt=""
            />
            <Link className="hidden sm:block" to={"/DoctorList"}>
              DoctorList
            </Link>
          </div>
        </div>
      )}
      {dToken && (
        <div className="h-[100vh] sm:min-w-[300px]  min-w-[40px]   bg-white  p-3 border-gray-400 border-r-2">
          <div className="flex m-2 p-4 items-center text-gray-600  font-semibold gap-4 hover:bg-gray-200">
            <img
              className="h-[60px] w-[40px] gap-2"
              src={assets.home_icon}
              alt=""
            />
            <Link className="hidden sm:block" to={"/DoctorDashBoard"}>
              Dashboard
            </Link>
          </div>

          <div className="flex m-2 p-4 items-center text-gray-600 font-semibold gap-4 hover:bg-gray-200">
            <img
              className="h-[60px] w-[40px] gap-2 "
              src={assets.appointment_icon}
              alt=""
            />
            <Link className="hidden sm:block" to={"/DoctorAppointments"}>
              Appointments
            </Link>
          </div>

          <div className="flex m-2 p-4 items-center text-gray-600 font-semibold gap-4 hover:bg-gray-200">
            <img
              className="h-[60px] w-[40px] gap-2"
              src={assets.people_icon}
              alt=""
            />
            <Link className="hidden sm:block" to={"/DoctorProfile"}>
              Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

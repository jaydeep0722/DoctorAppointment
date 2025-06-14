import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../../../FrontEnd/my-project/src/assets/assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";

const DoctorDashBoard = () => {
  const { dToken, dbackEndUrl, cancelAppointment, completeAppointment } =
    useContext(DoctorContext);
  const { slotDateFormat } = useContext(AdminContext);
  const [dashData, setDashData] = useState("");
  const DocDashBoardData = async () => {
    try {
      const { data } = await axios.get(
        dbackEndUrl + "/api/doctor/doctorDashboard",
        { headers: { dToken } }
      );
      if (data.success) {
        // toast.success(" Data Get  Success");
        console.log(data.dashData);
        setDashData(data.dashData);
      } else {
        toast.error("Data Get Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      DocDashBoardData();
    }
  }, [dToken]);
  return (
    dashData && (
      // <h1>xx</h1>
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                ${dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border mt-10">
            <img src={assets.list_icon} alt="" />
            <p className="font-bold text-black">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div className="flex items-center  px-6 py-4 gap-4 " key={index}>
                <img
                  className="riunded-full w-10 "
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm ">
                  <p className="text-gray-800">{item.userData.name}</p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-600 p-1 text-xs font-medium">
                    Cancelled
                  </p>
                ) : item.isComplete ? (
                  <p className="text-green-700 p-1 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex flex-wrap">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10  cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10  cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashBoard;

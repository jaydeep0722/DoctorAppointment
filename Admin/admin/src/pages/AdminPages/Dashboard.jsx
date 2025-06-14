import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../../../FrontEnd/my-project/src/assets/assets/assets_admin/assets";

const Dashboard = () => {
  const { aToken, backEndUrl, CancelAppointment, slotDateFormat } =
    useContext(AdminContext);
  const [AllData, setAllData] = useState(false);

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backEndUrl + "/api/admin/AdminDashBoardData",
        { headers: { aToken } }
      );
      if (data.success) {
        // toast.success("Dash Data get Success");

        setAllData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error("Data not found");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return (
    AllData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {AllData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {AllData.appointments.length}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {AllData.users}
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
            {AllData.appointments.map((item, index) => (
              <div className="flex items-center  px-6 py-4 gap-4 " key={index}>
                <img
                  className="riunded-full w-10 "
                  src={item.docData.image}
                  alt=""
                />
                <div className="flex-1 text-sm ">
                  <p className="text-gray-800">{item.docData.name}</p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-600 p-1 text-xs font-medium">
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 p-1 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => CancelAppointment(item._id)}
                    className="w-10   cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;

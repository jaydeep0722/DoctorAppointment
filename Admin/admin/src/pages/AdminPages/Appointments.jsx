import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../../../../FrontEnd/my-project/src/assets/assets/assets_admin/assets";

const Appointments = () => {
  const {
    aToken,
    calculateAge,
    slotDateFormat,
    CancelAppointment,
    AllAppointments,
    GetAllAppointments,
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      GetAllAppointments();
    }
  }, []);

  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg text-black font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-auto">
        <div className="hidden sm:grid text-black font-medium grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p1>#</p1>
          <p1>Patient</p1>
          <p1>Age</p1>
          <p1>Date & Time</p1>
          <p1>Doctor</p1>
          <p1>Fees</p1>
          <p1>Actions</p1>
        </div>
        {AllAppointments.map((item, index) => (
          <div
            className=" font-medium p-2 flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 border-b  hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm-hidden">{index + 1}</p>
            <div className="flex items-center gap-2 ">
              <img
                className="w-8 rounded-full "
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>
            <div className="flex items-center gap-2 ">
              <img
                className="w-8 bg-gray-200 rounded-full "
                src={item.docData.image}
                alt=""
              />
              <p>{item.docData.name}</p>
            </div>
            <p>${item.amount}</p>
            {item.cancelled ? (
              <p className="text-red-600 p-1 text-xs font-medium">Cancelled</p>
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
  );
};

export default Appointments;

import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/Appcontext";
import { assets } from "../../../../../FrontEnd/my-project/src/assets/assets/assets_admin/assets";

const DoctorAppointments = () => {
  const {
    getAppointments,
    dToken,
    appointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg text-black font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-auto">
        <div className="hidden sm:grid text-black font-medium grid-cols-[0.6fr_2.5fr_1fr_3fr_3fr_1fr_0.7fr] grid-flow-col py-3 px-6 border-b">
          <p1>#</p1>
          <p1>Patient</p1>
          <p1>Payment</p1>
          <p1>Age</p1>
          <p1>Date & Time</p1>
          <p1>Fees</p1>
          <p1>Action</p1>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            className=" font-medium p-2 flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_0.9fr] items-center text-gray-500 border-b  hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm-hidden ml-4 ">{index + 1}</p>
            <div className="flex items-center gap-2 ">
              <img
                className="w-8 rounded-full "
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>
            <p className=" text-xs inline max-w-fit px-2 border-primary border rounded-full ">
              {item.payment ? "Online" : "Cash"}
            </p>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>

            <p>${item.amount}</p>

            {item.cancelled ? (
              <p className="text-red-600 p-1 text-xs font-medium">Cancelled</p>
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
  );
};

export default DoctorAppointments;

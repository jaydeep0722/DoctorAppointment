
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContexts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backEndUrl, aToken, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[Number(month)]} ${year}`;
  };

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/user/appointments`, {
        headers: { aToken },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const CancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/user/CancelAppointment`,
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getUsersAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backEndUrl}/api/user/verifyPayment`,
            { razorpay_order_id: response.razorpay_order_id },
            { headers: { aToken } }
          );
          if (data.success) {
            toast.success("Payment Successful");
            getUsersAppointments();
            navigate("/myappointments");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorPay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/user/PaymentRazorPay`,
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (aToken) getUsersAppointments();
  }, [aToken]);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6 space-y-6">
      {appointments.map((item, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row bg-white shadow-md rounded-md overflow-hidden p-4 gap-4"
        >
          <img
            className="w-full h-56 lg:h-[200px] lg:w-[200px] object-cover rounded"
            src={item.docData.image}
            alt="doctor"
          />
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-black font-semibold text-xl">
                {item.docData.name}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                {item.docData.speciality}
              </p>
              <p className="text-gray-600 text-sm">Address:</p>
              <p className="text-gray-600 text-sm">
                {item.docData.address.line1}
              </p>
              <p className="text-gray-600 text-sm">
                {item.docData.address.line2}
              </p>
              <p className="text-gray-600 text-sm mt-2">Date & Time:</p>
              <p className="text-gray-500 text-sm">
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-4">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="px-4 py-2 bg-green-600 text-white rounded">
                  Paid
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentRazorPay(item._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => CancelAppointment(item._id)}
                  className="px-4 py-2 border border-gray-400 text-gray-700 rounded"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded cursor-not-allowed"
                  disabled
                >
                  Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className="px-4 py-2 bg-green-600 text-white rounded">
                  Completed
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;

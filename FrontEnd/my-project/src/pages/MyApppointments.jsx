import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContexts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyApppointments = () => {
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
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(1)] + " " + dateArray[2];
  };

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(backEndUrl + "/api/user/appointments", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // cancel appointments
  const CancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);

      const { data } = await axios.post(
        backEndUrl + "/api/user/CancelAppointment",
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
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // make payment

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
        console.log(response);

        const razorpay_order_id = response.razorpay_order_id;

        try {
          const { data } = await axios.post(
            backEndUrl + "/api/user/verifyPayment",
            { razorpay_order_id },
            { headers: { aToken } }
          );

          if (data.success) {
            toast.success("Payment Success");
            getUsersAppointments();
            navigate("/myappointments");
          }
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorPay = async (appointmentId) => {
    try {
      // console.log(appointmentId);
      const { data } = await axios.post(
        backEndUrl + "/api/user/PaymentRazorPay",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);

        initPay(data.order);
        console.log(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.mesdage);
    }
  };

  useEffect(() => {
    if (aToken) {
      getUsersAppointments();
    }
  }, [aToken]);

  const filtered = appointments.slice(0, 1);
  return (
    <div className="h-[225px] w-[1525px]  flex flex-col gap-4 p-3 m-2 ">
      {appointments.map((item, index) => (
        <div key={index} className="flex shadow-box">
          <img
            className="h-[200px] ml-3 mt-3 bg-gray-300 w-[200px] mr-6"
            src={item.docData.image}
            alt=""
          />
          <div className="flex flex-col ">
            <h3 className="text-black mt-2 font-md text-xl ">
              {item.docData.name}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {item.docData.speciality}
            </p>
            <p className="text-gray-600 mb-2 ">Address:</p>
            <p className="text-gray-600 mb-2 ">{item.docData.address.line1}</p>
            <p className="text-gray-600 mb-2 ">{item.docData.address.line2}</p>
            <p className="text-gray-600 mb-2">Date & Time: </p>
            <p
              className="
              text-gray-500
              mb-2"
            >
              {slotDateFormat(item.slotDate)}|{item.slotTime}
            </p>
          </div>

          <div className="flex flex-col justify-end items-end gap-5 pb-6 w-[1050px] ">
            {!item.cancelled && item.payment && !item.isCompleted && (
              <button className="h-[49px] w-[223px]  text-white font-md bg-green-600">
                Paid
              </button>
            )}
            {!item.cancelled && !item.payment && !item.isCompleted && (
              <button
                onClick={() => appointmentRazorPay(item?._id)}
                className="h-[49px] w-[223px]  text-white font-md background"
              >
                Pay Online
              </button>
            )}
            {!item.cancelled && !item.isCompleted && (
              <button
                onClick={() => CancelAppointment(item._id)}
                className="h-[49px] w-[223px] shadow-box text-gray-700 font-md"
              >
                Cancel Appointment
              </button>
            )}

            {item.cancelled && !item.isCompleted && (
              <button
                onClick={() => CancelAppointment(item._id)}
                className="h-[49px] w-[223px] shadow-box border text-white bg-red-500 border-red-500  font-md"
              >
                Cancelled Appointment
              </button>
            )}

            {item.isCompleted && (
              <button className="h-[49px] w-[223px]  text-white font-md bg-green-600">
                Completed
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyApppointments;

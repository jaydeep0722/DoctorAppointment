import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backEndUrl = "http://localhost:8001";

  const [AllDoctors, setAllDoctors] = useState([]);
  const calculateAge = (dob) => {
    const today = new Date();
    const bdate = new Date(dob);

    let age = today.getFullYear() - bdate.getFullYear();
    return age;
  };

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

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backEndUrl + "/api/admin/AllDoctors",
        {},

        { headers: { aToken } }
      );
      if (data.success) {
        setAllDoctors(data.doctors);
        // console.log(data.doctors)
      } else {
        toast.error("Data not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeAvailibility = async (docId) => {
    try {
      const { data } = await axios.post(
        backEndUrl + "/api/admin/changeAvailibility",
        { docId },
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // get All appointments
  const [AllAppointments, setAllappointments] = useState([]);
  const GetAllAppointments = async () => {
    try {
      console.log(backEndUrl);
      console.log(aToken);
      const { data } = await axios.get(
        backEndUrl + "/api/admin/adminAllAppointments",
        { headers: { aToken } }
      );
      console.log(data);

      if (data.success) {
        // toast.success(data.message);
        console.log(data.appointments);
        setAllappointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // cancel Appointments
  const CancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);

      const { data } = await axios.post(
        backEndUrl + "/api/admin/AppointmentCancelAdmin",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        GetAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const value = {
    aToken,
    setAToken,
    backEndUrl,
    AllDoctors,

    getAllDoctors,
    changeAvailibility,

    calculateAge,
    slotDateFormat,

    GetAllAppointments,
    AllAppointments,
    CancelAppointment,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

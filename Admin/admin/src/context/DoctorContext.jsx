import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const dbackEndUrl = "http://localhost:8001";
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        dbackEndUrl + "/api/doctor/appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        // toast.success("got All Appointments Success");
        console.log(data.appointments.reverse());
        setAppointments(data.appointments.reverse());
      } else {
        toast.error("Data not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);
      const { data } = await axios.post(
        dbackEndUrl + "/api/doctor/appointmentComplete",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(" Appointment Complete  Success");
        getAppointments();
      } else {
        toast.error("Appointment Complete Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);
      const { data } = await axios.post(
        dbackEndUrl + "/api/doctor/appointmentCancel",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(" Appointment Cancel  Success");
        getAppointments();
      } else {
        toast.error("Appointment Cancel Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // get appoinntment data

  const GetProfileData = async () => {
    try {
      const { data } = await axios.get(
        dbackEndUrl + "/api/doctor/GetDoctorProfile",
        { headers: { dToken } }
      );
      if (data.success) {
        // toast.success("GetDoctorProfile Success");
        console.log(data.profileData);
        setProfileData(data.profileData);
      } else {
        toast.error("Profile do  not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const value = {
    dToken,
    setDToken,
    dbackEndUrl,
    appointments,
    setAppointments,
    getAppointments,

    completeAppointment,
    cancelAppointment,

    profileData,
    setProfileData,
    GetProfileData,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

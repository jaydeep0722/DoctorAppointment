import React, { createContext, useEffect, useState } from "react";

import { doctors } from "../assets/assets/assets_frontend/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppContextProviderFunc = (props) => {
  const [aToken, setAToken] = useState("");
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const [getdoctorsDoctors, setDoctors] = useState([]);

  // get Profile data
  const [userData, setUserData] = useState(false);

  // getDoctorsData
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backEndUrl + "/api/doctor/list");
      console.log(data)

      if (data.success) {
        console.log(data.message)
        setDoctors(data.message);
       
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  console.log(getdoctorsDoctors);

  useEffect(() => {
    getDoctorsData();
  }, []);

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        backEndUrl + "/api/user/getProfileData",
        { headers: { aToken } }
      );
      // console.log(data);

      if (data.success) {
        // console.log(data);
        setUserData(data.message);
      } else {
        toast.error("Profile data Problem");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getdoctorsDoctors,
    aToken,
    setAToken,
    backEndUrl,

    getDoctorsData,

    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    if (aToken) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [aToken]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProviderFunc;

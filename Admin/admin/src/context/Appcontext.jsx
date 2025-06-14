import React from "react";
import { createContext } from "react";

export const AppContext = createContext();
const AppContextProvider = (props) => {

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


  const calculateAge = (dob) => {
    const today = new Date();
    const bdate = new Date(dob);

    let age = today.getFullYear() - bdate.getFullYear();
    return age;
  };
  const value = { calculateAge, slotDateFormat };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

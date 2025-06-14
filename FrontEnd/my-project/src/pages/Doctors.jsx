import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllDoctors from "../helper/AllDoctors";
import { AppContext } from "../context/AppContexts";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { getdoctorsDoctors } = useContext(AppContext);
  console.log(getdoctorsDoctors)

  // console.log(speciality);
  const [filteredDoctors, SetfilteredDoctors] = useState([]);

  const filtereddoctors = () => {
    const filterd = getdoctorsDoctors.filter(
      (item) => item.speciality === speciality
    );
    SetfilteredDoctors(filterd);
  };

  useEffect(() => {
    filtereddoctors();
  }, [getdoctorsDoctors, speciality]);

  return (
    <div className="flex flex-col">
      <div className="flex w-full m-3 ml-8 mb-5   h-[40px]">
        <p className="text-xl  text-medium text-gray-600 mb-4   w-[400px]">
          Browse through the doctors specialist.
        </p>
      </div>

      <div className="flex ">
        <div className=" w-[350px] ">
          <div className="gap-3 text-gray-600  p-3 text-xl black text-medium">
            <p
              onClick={() =>
                speciality === "General physician"
                  ? navigate("/doctors")
                  : navigate("/doctors/General physician")
              }
              className="mb-2 mt-4 hover:bg-slate-300 border-gray border rounded-md p-2 transition-all duration-150 "
            >
              General physician
            </p>
            <p
              onClick={() =>
                speciality === "Gynecologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gynecologist")
              }
              className="mb-2 mt-4  border-gray border rounded-md hover:bg-slate-300 border-b-2 p-2 transition-all duration-150 "
            >
              Gynecologist
            </p>
            <p
              onClick={() =>
                speciality === "Dermatologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Dermatologist")
              }
              className="mb-2 mt-4 border-gray border rounded-md hover:bg-slate-300 border-b-2 p-2 transition-all duration-150 "
            >
              Dermatologist
            </p>
            <p
              onClick={() =>
                speciality === "Pediatricians"
                  ? navigate("/doctors")
                  : navigate("/doctors/Pediatricians")
              }
              className="mb-2 mt-4 border-gray border rounded-md hover:bg-slate-300 border-b-2 p-2 transition-all duration-150 "
            >
              Pediatricians
            </p>
            <p
              onClick={() =>
                speciality === ""
                  ? navigate("/doctors")
                  : navigate("/doctors/Neurologist")
              }
              className="mb-2 mt-4 border-gray border rounded-md hover:bg-slate-300 border-b-2 p-2 transition-all duration-150 "
            >
              Neurologist
            </p>
            <p
              onClick={() =>
                speciality === "Gastroenterologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gastroenterologist")
              }
              className="mb-2 mt-4 border-gray border rounded-md hover:bg-slate-300 border-b-2 p-2 transition-all duration-150 "
            >
              Gastroenterologist
            </p>
          </div>
        </div>

        {speciality ? (
          <>
            <AllDoctors speciality={filteredDoctors} />
          </>
        ) : (
          <>
            <AllDoctors />
          </>
        )}
      </div>
    </div>
  );
};

export default Doctors;

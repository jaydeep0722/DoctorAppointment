

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContexts";

const Topdoctors = () => {
  const navigate = useNavigate();
  const { getdoctorsDoctors } = useContext(AppContext);
  console.log(getdoctorsDoctors);

  return (
    <>
      {/* Header */}
      <div className="gap-3 mt-20 mb-10 text-center items-center p-2 flex flex-col text-black font-medium">
        <h1 className="text-3xl">Top Doctors to Book</h1>
        <p className="text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-5 justify-center items-center px-4">
        {getdoctorsDoctors.slice(0, 10).map((item, index) => (
          <Link
            to={`/appointments/${item._id}`}
            key={index}
            className="w-full sm:w-[300px] md:w-[270px] hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center shadow-md rounded-lg overflow-hidden bg-white">
              <div className="h-[200px] w-full bg-gray-300 flex items-center justify-center">
                <img
                  className="h-[180px] object-contain"
                  src={item.image}
                  alt="doctor"
                />
              </div>

              <div className="w-full p-3">
                <p
                  className={`${
                    item.available ? "text-green-500" : "text-gray-500"
                  } font-medium`}
                >
                  *{item.available ? "Available" : "Not Available"}
                </p>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <h5 className="text-sm text-gray-700">{item.speciality}</h5>
              </div>
            </div>
          </Link>
        ))}

        {/* More Button */}
        <div className="w-full flex justify-center mt-6">
          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo(0, 0);
            }}
            className="Morebtn bg-blue-500 text-white px-5 py-2 rounded-md shadow-md hover:scale-105 transition-transform"
          >
            More
          </button>
        </div>
      </div>
    </>
  );
};

export default Topdoctors;

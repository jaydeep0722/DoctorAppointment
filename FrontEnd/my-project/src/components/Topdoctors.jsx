
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContexts";

const Topdoctors = () => {
  const navigate = useNavigate();
  const { getdoctorsDoctors } = useContext(AppContext);

  return (
    <>
      {/* Header */}
      <div className="gap-3 mt-10 mb-6 text-center items-center p-2 flex flex-col text-black font-medium">
        <h1 className="text-2xl sm:text-3xl">Top Doctors to Book</h1>
        <p className="text-sm sm:text-base text-gray-600 px-4">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 px-4">
        {getdoctorsDoctors.slice(0, 10).map((item, index) => (
          <Link
            to={`/appointments/${item._id}`}
            key={index}
            className="w-full max-w-xs sm:w-[300px] md:w-[270px] hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center shadow-md rounded-lg overflow-hidden bg-white">
              {/* Image Container */}
              <div className="h-[200px] w-full bg-gray-200 flex items-center justify-center">
                <img
                  className="h-[180px] object-contain"
                  src={item.image}
                  alt="doctor"
                />
              </div>

              {/* Details */}
              <div className="w-full p-4 text-center">
                <p
                  className={`${
                    item.available ? "text-green-500" : "text-red-400"
                  } text-sm font-medium mb-1`}
                >
                  {item.available ? "Available" : "Not Available"}
                </p>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <h5 className="text-sm text-gray-700">{item.speciality}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* More Button */}
      <div className="w-full flex justify-center mt-6 px-4">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:scale-105 transition-transform"
        >
          More
        </button>
      </div>
    </>
  );
};

export default Topdoctors;

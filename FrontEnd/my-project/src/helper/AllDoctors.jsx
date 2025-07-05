
import React, { useContext } from "react";
import { AppContext } from "../context/AppContexts";
import { Link, useNavigate } from "react-router-dom";

const AllDoctors = ({ speciality }) => {
  const navigate = useNavigate();
  const { getdoctorsDoctors } = useContext(AppContext);

  const doctors = speciality ? speciality : getdoctorsDoctors;

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 sm:p-6 md:p-8">
      {doctors.map((item, index) => (
        <Link
          to={`/appointments/${item._id}`}
          key={index}
          className="w-full sm:w-[48%] md:w-[32%] lg:w-[22%] max-w-xs"
        >
          <div className="hover:scale-105 transition-transform duration-300 border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="w-full h-48 bg-gray-100 flex justify-center items-center">
              <img
                className="h-full object-contain"
                src={item.image}
                alt="Doctor"
              />
            </div>

            <div className="p-3 text-center">
              <p
                className={`font-medium ${
                  item.available ? "text-green-500" : "text-gray-500"
                }`}
              >
                * {item.available ? "Available" : "Not Available"}
              </p>
              <h2 className="text-xl font-semibold mt-1">{item.name}</h2>
              <h5 className="text-sm text-gray-600">{item.speciality}</h5>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllDoctors;

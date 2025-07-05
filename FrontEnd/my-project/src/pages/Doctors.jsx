
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllDoctors from "../helper/AllDoctors";
import { AppContext } from "../context/AppContexts";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { getdoctorsDoctors } = useContext(AppContext);

  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const filterDoctors = () => {
    const filtered = getdoctorsDoctors.filter(
      (item) => item.speciality === speciality
    );
    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    filterDoctors();
  }, [getdoctorsDoctors, speciality]);

  const handleNavigate = (spec) => {
    if (speciality === spec) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${spec}`);
    }
  };

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      {/* Heading */}
      <div className="mb-6">
        <p className="text-xl font-medium text-gray-600">
          Browse through the doctors specialist.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="flex lg:flex-col gap-3 overflow-x-auto scrollbar-hide text-gray-600 text-base font-medium">
            {specialities.map((spec, index) => (
              <p
                key={index}
                onClick={() => handleNavigate(spec)}
                className="cursor-pointer whitespace-nowrap border border-gray-300 px-4 py-2 rounded-md hover:bg-slate-200 transition-all duration-150"
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Doctors Display */}
        <div className="w-full">
          {speciality ? (
            <AllDoctors speciality={filteredDoctors} />
          ) : (
            <AllDoctors />
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;

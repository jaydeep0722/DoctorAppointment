
import React from "react";
import { specialityData } from "../assets/assets/assets_frontend/assets.js";
import { Link } from "react-router-dom";

const Speciality = () => {
  return (
    <>
      <div id="specialist" className="text-black px-4 sm:px-8">
        <div className="flex flex-col gap-2 mt-7 justify-center items-center text-center max-w-4xl mx-auto">
          <h1 className="font-medium my-3 text-3xl sm:text-4xl pt-2">
            Find by Speciality
          </h1>
          <p className="text-base sm:text-xl font-semibold px-2 sm:px-0">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>

        <div className="flex justify-start sm:justify-center items-center gap-4 p-2 my-4 overflow-x-auto scrollbar-hide max-w-full">
          {specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              className="flex-shrink-0 transform hover:-translate-y-2 transition-all duration-300"
              to={`/doctors/${item.speciality}`}
              key={index}
            >
              <img
                className="h-[110px] w-[110px] sm:h-[125px] sm:w-[126px] rounded object-cover"
                src={item.image}
                alt={item.speciality}
              />
              <p className="text-center text-sm font-medium mt-2">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Speciality;

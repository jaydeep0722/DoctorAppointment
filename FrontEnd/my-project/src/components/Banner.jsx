
import React from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="background flex flex-col md:flex-row items-center justify-between 
                 rounded-2xl p-4 md:p-8 mt-6 md:mt-14 lg:mt-24 mx-2 md:mx-8"
    >
      {/* Left Section */}
      <div className="flex flex-col items-start justify-center w-full md:w-1/2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 mt-6 md:mt-12">
          Book Appointment
        </h2>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-6">
          With 100+ Trusted Doctors
        </p>

        <button
          className="btn_2 bg-white text-black px-6 py-2 rounded-md hover:scale-105 transition duration-300"
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
        >
          Create Account
        </button>
      </div>

      {/* Right Section (Image) */}
      <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img
          className="w-[80%] md:w-[300px] lg:w-[450px] h-auto max-h-[450px] object-contain"
          src={assets.appointment_img}
          alt="Appointment"
        />
      </div>
    </div>
  );
};

export default Banner;

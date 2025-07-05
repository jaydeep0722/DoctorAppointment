
import React from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";

const Contacts = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 text-black">
      {/* Heading */}
      <div className="flex justify-center mb-10">
        <div className="text-3xl mt-10 text-center">
          <p className="text-gray-600">
            CONTACT <span className="text-black font-semibold">Us</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
        {/* Image */}
        <img
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
          src={assets.contact_image}
          alt="Contact"
        />

        {/* Contact Info */}
        <div className="flex flex-col gap-2 w-full max-w-lg text-center lg:text-left">
          <h3 className="text-xl text-gray-600 font-bold mb-3">Our OFFICE</h3>

          <p className="text-sm mb-2">
            54709 Willms Station Suite 350, Washington, USA
          </p>
          <p className="text-sm mb-2">Tel: (415) 555‑0132</p>
          <p className="text-sm mb-6">Email: greatstackdev@gmail.com</p>

          <h3 className="text-xl text-gray-600 font-bold mt-6 mb-2">
            Careers at PRESCRIPTO
          </h3>
          <p className="mb-6">Learn more about our teams and job openings.</p>

          {/* Button */}
          <div>
            <button className="px-6 py-3 border border-black text-gray-600 text-lg rounded hover:bg-gray-100 transition-all">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

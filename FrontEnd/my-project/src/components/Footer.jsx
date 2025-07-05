
import React from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";

const Footer = () => {
  return (
    <>
      <div
        className="
          border-b-2
          flex flex-col sm:grid sm:grid-cols-3
          gap-8 sm:gap-10
          w-full
          px-4 sm:px-12
          py-10 sm:py-16
          font-sans
        "
      >
        {/* Left Section */}
        <div>
          <img
            className="mt-2 mb-4 w-[120px] h-auto"
            src={assets.logo}
            alt="Logo"
          />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Prescripto helps you find trusted doctors and book appointments
            instantly. Explore top specialists, view availability, and manage
            your health with ease.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-6">
            COMPANY
          </h3>
          <ul className="text-base text-gray-700 font-medium">
            <li className="py-1">HOME</li>
            <li className="py-1">ABOUT US</li>
            <li className="py-1">CONTACT US</li>
            <li className="py-1">PRIVACY POLICY</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-6">
            GET IN TOUCH
          </h3>
          <ul className="text-base text-gray-700 font-medium">
            <li className="py-1">+1-212-456-7890</li>
            <li className="py-1">XYZ@gmail.com</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;

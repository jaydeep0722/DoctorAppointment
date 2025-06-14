import React from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";
const Contacts = () => {
  return (
    <div>
      <div className=" flex  justify-center ml-40">
        <div className="h-[38px]  w-[183px] text-3xl flex justify-center items-center mt-24 mb-10">
          <p className="text-gray-600">
            CONTACT <span className="text-black font-medium">Us</span>{" "}
          </p>
        </div>
      </div>

      <div className=" flex gap-16 ml-40 mb-44">
        {/* img */}
        <img
          className="h-[560px] w-[560px]"
          src={assets.contact_image}
          alt=""
        />

        <div className=" text-black gap-5 flex-col ">
          <div>
            <h3 className="text-xl text-gray-600 font-bold mb-4 mt-4">
              Our OFFICE
            </h3>
          </div>

          <p className="text-sm mb-2">
            54709 Willms Station Suite 350, Washington, USA
          </p>
          <br />
          <p className="text-sm mb-2">Tel: (415) 555‑0132</p>
          <p className="text-sm mb-10">Email: greatstackdev@gmail.com</p>

          <h3 className="font-bold text-xl text-gray-600 mt-4 mb-3">
            Careers at PRESCRIPTO
          </h3>
          <p>Learn more about our teams and job opening</p>

          <div className="h-[62px] w-[171px] mt-20 mb-7">
            <button className="p-3 h-[88px] items-center font-md  mt-7 flex border-black border rounded text-2xl text-gray-600 justify-center align-middle">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

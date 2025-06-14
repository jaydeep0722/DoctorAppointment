import React from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";

const About = () => {
  return (
    <div>
      <div className="flex justify-center align-middle mt-32 ">
        <p className="w-[153px] h-[80px] text-black text-3xl ">
          <span>ABOUT</span>
          <b className="ml-2">US</b>
        </p>
      </div>

      <div className="flex gap-10">
        {/* img */}
        <img
          className="w-[438px] mt-[100px] ml-[196px] gap-9 h-[445px]"
          src={assets.about_image}
        />

        {/* right side para */}
        <div className="flex flex-col  mt-[100px] w-[600px] line h-[448px]  text-black text-sm">
          <p className="mb-15 mt-2 ">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <br />
          <p className="mb-5 mt-10">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way
          </p>
          <br />
          <h3 className="font-gray-600 mt-5 mb-5  text-gray-600 text-3xl ">
            Our <span className="text-black font-medium">Vision</span>
          </h3>
          <br />
          <p className="mt-15">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="ml-[196px] text-black mt-[100px] mb-[400px]">
        <div className="mt-5 mb-10">
          <b className="w-[281px] h-[80px] text-2xl">
            <span className="mr-2 text-gray-600">WHY</span>Choose Us
          </b>
        </div>

        <div className="w-[1587px] mt-[20px]   flex border-gray border pt-9 pl-9 ">
          <div className="gap-3 ">
            <b className="text-xl font-medium">Efficiency:</b>
            <p className="w-2/3 mt-4 mb-5 ">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          <div>
            <b className="text-xl font-medium">Convenience:</b>
            <p className="w-2/3 mt-4 mb-5 ">
              Access to a network of trusted healthcare professionals in your
              area
            </p>
          </div>

          <div>
            <b className="text-xl font-medium">Personalization:</b>
            <p className="w-2/3 mt-4 mb-5 ">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

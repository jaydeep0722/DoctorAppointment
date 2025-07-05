
import React from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";

const About = () => {
  return (
    <div className="text-black px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Title */}
      <div className="flex justify-center mt-20 mb-10">
        <p className="text-3xl font-semibold">
          <span>ABOUT</span>
          <b className="ml-2">US</b>
        </p>
      </div>

      {/* Image + Paragraph Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <img
          className="w-full max-w-md h-auto rounded-md"
          src={assets.about_image}
          alt="About Us"
        />

        {/* Text Content */}
        <div className="flex flex-col text-sm max-w-xl mt-6 md:mt-0">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>

          <p className="mt-6">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>

          <h3 className="text-2xl text-gray-600 mt-6 mb-3">
            Our <span className="text-black font-medium">Vision</span>
          </h3>

          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-20 mb-20">
        <h2 className="text-2xl mb-6 font-semibold text-center">
          <span className="text-gray-600 mr-2">WHY</span>Choose Us
        </h2>

        <div className="flex flex-col md:flex-row gap-6 border border-gray-300 p-6 rounded-md">
          {/* Card 1 */}
          <div className="flex-1">
            <b className="text-xl">Efficiency:</b>
            <p className="mt-3">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex-1">
            <b className="text-xl">Convenience:</b>
            <p className="mt-3">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex-1">
            <b className="text-xl">Personalization:</b>
            <p className="mt-3">
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

// import React from "react";
// import { assets } from "../assets/assets/assets_frontend/assets.js";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// const Header = () => {
//   return (
//     <>
//       <div className="main_div text-black">
//         {/* left side of header */}
//         <div className="left_div ">
//           <p className="text-white text-5xl font-medium mt-3 mb-4 ">
//             Book Appointment <br /> With Trusted Doctors
//           </p>
//           <div className="m-2 gap-3 flex font-semibold p-2">
//             <img src={assets.group_profiles} alt="" />
//             <p>
//               Simply Browse Through Our Extensive List Of Trusted Doctors,
//               <br />
//               Schedule Your Appointment hassele free
//             </p>
//           </div>
//           <a href="#specialist" className="anchor">
//             Book Appointment
//             <ArrowForwardIcon sx={{ paddingLeft: "10px", fontSize: "40px" }} />
//           </a>
//         </div>

//         {/* Right side of header */}
//         <div className="right_div ">
//           <img src={assets.header_img} alt="" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;





import React from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Header = () => {
  return (
    <div className="main_div flex flex-col md:flex-row justify-between items-center p-4 md:p-8 text-black bg-gray-900">
      {/* Left side of header */}
      <div className="left_div flex-1 text-center md:text-left">
        <p className="text-white text-3xl md:text-5xl font-medium mt-3 mb-4">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="m-2 gap-3 flex flex-col sm:flex-row items-center md:items-start font-semibold p-2 text-gray-300">
          <img src={assets.group_profiles} alt="" className="w-24 sm:w-auto" />
          <p className="text-sm sm:text-base">
            Simply Browse Through Our Extensive List Of Trusted Doctors,
            <br className="hidden sm:block" />
            Schedule Your Appointment hassle free
          </p>
        </div>
        <a
          href="#specialist"
          className="anchor mt-4 inline-flex items-center text-blue-400 hover:underline text-lg"
        >
          Book Appointment
          <ArrowForwardIcon sx={{ paddingLeft: "10px", fontSize: "30px" }} />
        </a>
      </div>

      {/* Right side of header */}
      <div className="right_div flex-1 mt-6 md:mt-0 flex justify-center">
        <img
          src={assets.header_img}
          alt="header"
          className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain"
        />
      </div>
    </div>
  );
};

export default Header;

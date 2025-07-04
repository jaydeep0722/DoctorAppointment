// import React from "react";
// import { assets } from "../assets/assets/assets_frontend/assets.js";

// const Footer = () => {
//   return (
//     <>
//       <div className="border-b-2 flex flex-col gap-2 lg:mt-40 md:mt-28 sm:grid sm:grid-cols-3 h-[462px] w-[1920px]">
//         {/* left Section */}
//         <div className="mt-12 mb-20 gap-10">
//           <img
//             className="ml-9 mt-5 mb-5 w-50 h-[70px]  "
//             src={assets.logo}
//             alt=""
//           />
//           <p className="ml-9 w-[500px] mt-20 break-words align-left leading-6  font-semibold text-sm  text-gray-600 ">
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//             ever since the 1500s, when an unknown printer took a galley of type
//             and scrambled it to make a type specimen book.
//           </p>
//         </div>

//         {/* Middle Section */}

//         <div className="flex flex-col  w-[500px] pl-8 ">
//           <h3 className="mt-20  mb-20  text-3xl text-gray-800 font-medium ">
//             COMPANY
//           </h3>
//           <ul className="ml-2 text-bold text-gray-600 mb-10 ">
//             <li className="p-2 mb-2 text-gray-800 font-medium">HOME</li>
//             <li className="p-2 mb-2 text-gray-800 font-medium">ABOUT US</li>
//             <li className="p-2 mb-2 text-gray-800 font-medium">CONTACT US</li>
//             <li className="p-2 mb-2 text-gray-800 font-medium">
//               PRIVACY POLICY
//             </li>
//           </ul>
//         </div>

//         {/* Right Section */}

//         <div className="flex flex-col w-[600px]  text-black">
//           <h3 className="mt-20  mb-20  text-3xl text-gray-800 font-medium">
//             GET IN TOUCH
//           </h3>
//           <ul>
//             <li className="p-2 mb-2 text-gray-800 font-medium">
//               +1-212-456-7890
//             </li>
//             <li className="p-2 mb-2 text-gray-800 font-medium">
//               XYZ@gmail.com
//             </li>
//           </ul>
//         </div>
//       </div>
//       {/* copyright text */}
//       <div className="mt-20 mb-20 text-gray-600  flex justify-center items-center text-xl  text-medium ">
//         <hr />
//         <p className="align-center ">
//           Copyright © 2024 XYZ - All Right Reserved
//         </p>
//       </div>
//     </>
//   );
// };

// export default Footer;

import React from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";

const Footer = () => {
  return (
    <>
      <div
        className="
          border-b-2
          flex flex-col gap-6
          sm:grid sm:grid-cols-3
          sm:gap-10
          h-auto sm:h-[462px]
          w-full sm:w-[1920px]
          px-6 sm:px-0
          font-sans
        "
      >
        {/* Left Section */}
        <div className="mt-12 mb-20 gap-6 sm:gap-10">
          <img
            className="ml-0 sm:ml-9 mt-5 mb-5 max-w-[150px] h-auto"
            src={assets.logo}
            alt="Logo"
          />
          <p className="ml-0 sm:ml-9 max-w-full sm:w-[500px] mt-6 sm:mt-20 break-words leading-relaxed font-normal text-gray-600 text-sm sm:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col w-full sm:w-[500px] pl-0 sm:pl-8 mt-6 sm:mt-20">
          <h3 className="mb-6 sm:mb-20 text-2xl sm:text-3xl text-gray-800 font-semibold">
            COMPANY
          </h3>
          <ul className="ml-0 sm:ml-2 text-gray-600 mb-10 text-base sm:text-lg">
            <li className="p-2 mb-2 text-gray-800 font-medium cursor-pointer ">
              HOME
            </li>
            <li className="p-2 mb-2 text-gray-800 font-medium cursor-pointer ">
              ABOUT US
            </li>
            <li className="p-2 mb-2 text-gray-800 font-medium cursor-pointer ">
              CONTACT US
            </li>
            <li className="p-2 mb-2 text-gray-800 font-medium cursor-pointer ">
              PRIVACY POLICY
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full sm:w-[600px] text-black mt-6 sm:mt-20">
          <h3 className="mb-6 sm:mb-20 text-2xl sm:text-3xl text-gray-800 font-semibold">
            GET IN TOUCH
          </h3>
          <ul className="text-base sm:text-lg text-gray-800 font-medium">
            <li className="p-2 mb-2 cursor-default">+1-212-456-7890</li>
            <li className="p-2 mb-2 cursor-default">XYZ@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* copyright text */}
      <div className="mt-12 mb-12 text-gray-600 flex flex-col sm:flex-row justify-center items-center text-sm sm:text-base font-normal gap-2 sm:gap-4 px-6">
        <hr className="w-full sm:w-auto border-gray-400 mb-2 sm:mb-0" />
        <p className="text-center">
          Copyright © 2024 XYZ - All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;

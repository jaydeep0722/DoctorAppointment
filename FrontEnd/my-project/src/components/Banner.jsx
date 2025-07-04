// import React from "react";
// import { assets } from "../assets/assets/assets_frontend/assets.js";
// import { useNavigate } from "react-router-dom";
// const Banner = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className=" background flex md:mt-14  lg:mt-24 ml-8 h-[440px] w-[1430px] p-2 rounded-2xl">
//         {/* left side  part */}
//         <div className=" flex flex-col h-full w-[50%] ml-2 ">
//           <h2 className="sm:text-2xl md:text-4xl lg:text-6xl lg:p-4 font-bold md:p-2 m-2 mt-28  text-white">
//             Book Appointment
//           </h2>
//           <p className="text-white text-5xl lg:p-6 md:p-2 ml-2 font-sm">
//             With 100+ Trusted Doctors
//           </p>

//           <div>
//             <button
//               className="Morebtn_2 hover:scale-105 bg-white text-black "
//               onClick={() => {
//                 navigate("/login");
//                 scrollTo(0, 0);
//               }}
//             >
//               Create Account
//             </button>
//           </div>
//         </div>

//         {/* right side part */}

//         <div className="hidden md:block md:w-1/2 lg:w-[550px] relative">
//           <img
//             className="lg:w-full  lg:pl-20 md:w-[300px] absolute bottom-0 right-0 max-w-md lg:h-[490px] md:h-[460px]"
//             src={assets.appointment_img}
//             alt=""
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Banner;

import React from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="
          background 
          flex flex-col md:flex-row 
          mt-6 md:mt-14 lg:mt-24 
          ml-2 md:ml-8 
          w-full md:w-[1430px] 
          h-auto md:h-[440px] 
          p-4 md:p-2 
          rounded-2xl
        "
      >
        {/* left side part */}
        <div className="flex flex-col h-full w-full md:w-1/2 ml-0 md:ml-2">
          <h2 className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-bold p-2 md:p-4 mt-8 md:mt-28 text-white">
            Book Appointment
          </h2>
          <p className="text-white text-3xl md:text-5xl lg:text-5xl p-2 md:p-6 ml-0 md:ml-2 font-sm">
            With 100+ Trusted Doctors
          </p>

          <div className="p-2 md:p-0">
            <button
              className="btn_2 hover:scale-105 bg-white text-black"
              onClick={() => {
                navigate("/login");
                scrollTo(0, 0);
              }}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* right side part */}

        <div className="w-full md:w-1/2 lg:w-[550px] relative flex justify-center items-end">
          <img
            className="w-[80%] md:w-[300px] lg:w-full lg:pl-20 max-w-md h-auto md:h-[460px] lg:h-[490px]"
            src={assets.appointment_img}
            alt="Appointment"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;

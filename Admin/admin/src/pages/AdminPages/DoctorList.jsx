import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";

const DoctorList = () => {
  const { AllDoctors, aToken, getAllDoctors, changeAvailibility } =
    useContext(AdminContext);
  console.log(AllDoctors);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <div className="m-5 max-h-[90vh]  ml-32 scroll-container">
      <h1 className="text-lg font-medium text-gray-700">All Doctors</h1>
      <div className="flex flex-wrap w-full gap-4 py-6 gap-y-6 ">
        {AllDoctors.map((item, index) => (
          <div
            className="border bordser-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer "
            key={index}
          >
            <img
              className=" bg-indigo-50 hover:bg-primary  transition-all duration-500"
              src={item.image}
              alt=""
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {item.name}
              </p>
              <p className="text-zinc-600 text-sm ">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm ">
                <input
                  onChange={() => changeAvailibility(item._id)}
                  type="checkbox"
                  checked={item.available}
                />

                <p className="">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;

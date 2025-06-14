import React, { useContext } from "react";
import { AppContext } from "../context/AppContexts";
import { Link, useNavigate } from "react-router-dom";

const AllDoctors = ({ speciality }) => {
  const navigate = useNavigate();
  const { getdoctorsDoctors } = useContext(AppContext);
  return (
    <div className=" flex h-[800px] ml-22 p-20  w-[1468px] object-contain flex-wrap justify-between mt-4">
      {(speciality ? speciality : getdoctorsDoctors).map((item, index) => (
        <Link to={`/appointments/${item._id}`} key={index}>
          <div
            onClick={() => navigate(`/appointments/${getdoctorsDoctors._id}`)}
            className="hover:scale-105 transition-all border-gray rounded-md border  justify-center items-center  h-[304px] w-[270px] flex flex-col  mt-2"
          >
            <div className="flex h-[203px]  w-[270px] rounded-md bg-gray-300">
              <img
                className="h-[182px] w-[280px] object-contain"
                src={item.image}
                alt="image"
              />
            </div>

            <div className="bg-white text-black  w-[273px] ">
              <p
                className={`p-2 ${
                  item.available ? "text-green-500" : "text-gray-500"
                }  font-medium `}
              >
                *{item.available ? "Available" : "Not Available"}
              </p>
              <div className="font-medium ml-2">
                <h2 className="text-2xl">{item.name}</h2>
                <h5 className="text-sm">{item.speciality}</h5>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllDoctors;

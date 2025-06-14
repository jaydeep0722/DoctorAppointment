import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContexts";
import AllDoctors from "../helper/AllDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();
  const { docId } = useParams();

  const { getdoctorsDoctors, aToken, backEndUrl, getDoctorsData } =
    useContext(AppContext);

  const [profileById, setProfileById] = useState([]); //docProfile
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // find getdoctorsDoctors's bio by docId
  const findProfileById = async () => {
    const profileById = getdoctorsDoctors.find((item) => item._id === docId);
    console.log(profileById);
    setProfileById(profileById);
  };

  // timeslots
  const [docSlots, setDocSlots] = useState([]);
  const getTimeSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let Currday = new Date(today);
      Currday.setDate(today.getDate() + i);

      // set endTime
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === Currday.getDate()) {
        Currday.setHours(Currday.getHours() > 10 ? Currday.getHours() + 1 : 10);
        Currday.setMinutes(Currday.getMinutes() > 30 ? 30 : 0);
      } else {
        Currday.setHours(10);
        Currday.setMinutes(0);
      }

      let timeslots = [];
      while (Currday < endTime) {
        let formatedTime = Currday.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeslots.push({
          dateTime: new Date(Currday),
          time: formatedTime,
        });
        Currday.setMinutes(Currday.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeslots]);
    }
  };

  // booking slots
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Related getdoctorsDoctors

  const [filterdDoctors, setFilteredDoctors] = useState(null);
  const getFiltered = () => {
    console.log(profileById);
    const related = getdoctorsDoctors.filter(
      (item) => item.speciality === profileById.speciality
    );
    setFilteredDoctors(related);
  };

  // book appointment
  const bookAppointment = async () => {
    if (!aToken) {
      toast.warn("Login to Book Appointment");
      return navigate("/login");
    }

    try {
      const Datedata = docSlots[slotIndex][0].dateTime;
      const day = Datedata.getDate();
      const month = Datedata.getMonth() + 1;
      const year = Datedata.getFullYear();
      const slotDate = day + "_" + month + "_" + year;


      console.log("aToken",aToken)
      const { data } = await axios.post(
        backEndUrl + '/api/user/BooknewAppointment',
        {
          docId,
          slotTime,
          slotDate,
        },
        {
          headers:{
            aToken,
          },
        }
      );
      console.log(data);

      if (data.success) {
        toast.success("Appointment Booked success");
        getDoctorsData();
        navigate("/myappointments");
      } else {
        toast.error("Slot is not empty");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    findProfileById();
  }, [docId, getdoctorsDoctors]);

  useEffect(() => {
    getTimeSlots();
  }, [profileById]);
  useEffect(() => {
    getFiltered();
  }, [docSlots]);

  return (
    profileById && (
      <div>
        {/* main container of profile */}
        <div className="flex h-[340px] gap-8 w-fill p-2 mt-[70px] ml-[100px]  ">
          <div className="h-[331px] w-[356px] background flex justify-center rounded-md">
            <img className="h-[332px] w-full " src={profileById.image} alt="" />
          </div>

          {/* bio */}

          <div className="flex h-[331px] flex-col w-full gap-3 pt-3 border-gray-600 border rounded-md  text-black">
            <div className="pt-5 pl-8 ">
              <h2 className="font-medium text-2xl pb-2">{profileById.name}</h2>
              <div className="flex text-gray-600 gap-2 pr-2 text-sm ">
                <p className="pt-1">{profileById.degree}</p>
                <p className="pt-1">{profileById.speciality}</p>
                <p className="border-gray border rounded-xl p-1 text-sm">
                  {profileById.experience}
                </p>
              </div>
            </div>

            {/* about and fees */}
            <div className=" pt-5 pl-8 ">
              <p className="text-xl text-black pb-2  ">About:</p>
              <p className="text-gray-600 text-sm">{profileById.about}</p>
            </div>

            <div className=" pt-5 pl-8 ">
              <p className="text-gray-600 ">
                Appointment fee:
                <span className="text-black font-md">${profileById.fees}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="  text-gray  font-medium h-[400px] w-full ml-[400px] mt-7">
          <p className="text-3xl text-gray-500 font-semibold p-4">
            Booking slots
          </p>

          <div className="flex gap-2 items-center h-48 w-full overflow-x-scroll scrollbar-none">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`  hover:bg-blue-700 hover:text-white text-center py-6 ml-3 mr-3 min-w-16 rounded-full gap-3 cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  } `}
                >
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-2 w-[650px] overflow-x-scroll scroll-smooth  ml-3">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => {
                    setSlotTime(item.time);
                  }}
                  className={`hover:bg-blue-700 hover:text-white text-sm font-light flex-shrink-0 px-5 py-3 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white "
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary background w-[350px] h-[52px] rounded-full mt-8 ml-2  p-2 hover:bg-blue-700"
          >
            Book an Appointment
          </button>
        </div>

        {/* Related getdoctorsDoctors */}

        <div className="flex flex-col justify-center mt-32 items-center mb-10 text-black gap-3 ">
          <p className="text-4xl font-medium mb-2 mt-2 ">
            Related getdoctorsDoctors
          </p>
          <p className="text-md text-gray-700 mb-2 mt-2 ">
            Simply browse through our extensive list of trusted
            getdoctorsDoctors
          </p>
        </div>

        <AllDoctors speciality={filterdDoctors} />
      </div>
    )
  );
};

export default Appointments;

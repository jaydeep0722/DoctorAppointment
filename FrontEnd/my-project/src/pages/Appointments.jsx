
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContexts";
import AllDoctors from "../helper/AllDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { getdoctorsDoctors, aToken, backEndUrl, getDoctorsData } =
    useContext(AppContext);

  const [profileById, setProfileById] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [docSlots, setDocSlots] = useState([]);
  const [filterdDoctors, setFilteredDoctors] = useState(null);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const findProfileById = async () => {
    const profile = getdoctorsDoctors.find((item) => item._id === docId);
    setProfileById(profile);
  };

  const getTimeSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let Currday = new Date(today);
      Currday.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

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

  const getFiltered = () => {
    const related = getdoctorsDoctors.filter(
      (item) => item.speciality === profileById.speciality
    );
    setFilteredDoctors(related);
  };

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
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backEndUrl}/api/user/BooknewAppointment`,
        {
          docId,
          slotTime,
          slotDate,
        },
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success) {
        toast.success("Appointment Booked successfully");
        getDoctorsData();
        navigate("/myappointments");
      } else {
        toast.error("Slot is not empty");
      }
    } catch (error) {
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
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-24">
        {/* Doctor Profile Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-12 mb-8 max-w-6xl mx-auto">
          {/* Image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              className="rounded-md object-cover h-72 md:h-[330px] w-full max-w-sm"
              src={profileById.image}
              alt={profileById.name}
            />
          </div>

          {/* Bio */}
          <div className="w-full border rounded-md p-4 text-black">
            <h2 className="text-2xl font-semibold mb-2">{profileById.name}</h2>
            <div className="flex flex-wrap gap-2 text-gray-600 text-sm mb-3">
              <span>{profileById.degree}</span>
              <span>{profileById.speciality}</span>
              <span className="border rounded-xl px-2 py-1">
                {profileById.experience}
              </span>
            </div>
            <p className="font-semibold mb-1 text-xl">About:</p>
            <p className="text-sm text-gray-600 mb-4">{profileById.about}</p>
            <p>
              Appointment fee:{" "}
              <span className="text-black font-medium">
                ${profileById.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-10 max-w-5xl mx-auto text-black">
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">
            Booking Slots
          </h3>

          {/* Date Selection */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 mb-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`min-w-16 text-center px-4 py-3 rounded-full cursor-pointer text-sm ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Time Selection */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 mb-6">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm px-4 py-2 rounded-full cursor-pointer flex-shrink-0 ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            className="bg-primary hover:bg-blue-700 text-white rounded-full px-6 py-3 w-full sm:w-64"
          >
            Book an Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <div className="text-center mt-20 mb-8 px-4">
          <h2 className="text-3xl font-semibold mb-2">Related Doctors</h2>
          <p className="text-gray-600 text-sm">
            Simply browse through our list of trusted doctors.
          </p>
        </div>

        <AllDoctors speciality={filterdDoctors} />
      </div>
    )
  );
};

export default Appointments;

import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { GetProfileData, dbackEndUrl, dToken, profileData, setProfileData } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        dbackEndUrl + "/api/doctor/UpdateDoctorProfile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        GetProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      GetProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <div className="">
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white ">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700 ">
              {profileData.name}
            </p>

            <div className="flex items-center mt-1 gap-2 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* Doc About */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About
              </p>
              <p className="text-gray-600 text-sm max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee:
              <span className="text-gray-800">
                $
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="gap-2 flex py-2">
              <p className="text-gray-800  font-medium">Address:</p>
              <p className="text-sm text-gray-600">
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-2 mt-2 ">
              <input
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                type="checkbox"
                name=""
                id="input"
              />
              <label className=" text-gray-600" htmlFor="input ">
                Available
              </label>
            </div>

            {isEdit ? (
              <>
                <button
                  onClick={updateProfile}
                  className="px-4 py-1 border text-black  font-semibold border-primary hover:bg-primary transition-all hover:text-white text-sm rounded-full mt-5"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border text-black  font-semibold border-primary hover:bg-primary transition-all hover:text-white text-sm rounded-full mt-5"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;

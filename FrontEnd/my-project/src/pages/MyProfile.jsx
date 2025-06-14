import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets/assets_frontend/assets.js";
import { AppContext } from "../context/AppContexts.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const {
    userData,
    setUserData,

    aToken,
    loadUserProfileData,
    backEndUrl,
  } = useContext(AppContext);

  const [isEdit, SetIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const handleSubmit = async () => {

    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      image && formData.append("image", image);

      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("dob", userData.dob);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      const { data } = await axios.post(
        backEndUrl + "/api/user/updateProfileData",
        formData,
        { headers: { aToken } }
      );
      console.log(data);

      if (data.success) {
        toast.success("Profile updated success");
        await loadUserProfileData();
        SetIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    userData && (
      <div className="flex justify-start ml-48 items-center">
        <div className="w-[570px] h-[670px]">
          {isEdit ? (
            <>
              <label htmlFor="image">
                <div className="w-[180px] cursor-pointer ">
                  <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    className="w-[160px] h-[160px] rounded-md opacity-75 mt-10 mb-10"
                  />
                  {/* <img
                    src={image ? "" : assets.upload_icon}
                    className="absolute w-10 bottom-12 right-12 rounded-md opacity-75 "
                  /> */}
                </div>
                <input
                  hidden
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </>
          ) : (
            <>
              <img
                className="w-[160px] h-[160px] rounded-md mt-10 mb-5"
                src={userData.image}
                alt=""
              />
            </>
          )}

          {isEdit ? (
            <input
              value={userData.name}
              className="w-[227px] h-[40px] mt-2 mb-2 text-black font-md text-xl "
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="mt-2  mb-2 w-[227px] h-[40px] text-black font-md text-xl ">
              {userData.name}
            </p>
          )}

          <p className="text-gray-500 text-2xl mt-2 mb-3">
            CONTACT INFORMATION
          </p>
          <div className="flex  gap-6 mb-2">
            <p className="font-md text-black">Email id:</p>
            <p className="text-blue ">{userData.email}</p>
          </div>

          <div className="flex  gap-8">
            <p className="font-md text-black">Phone:</p>
            {isEdit ? (
              <input
                type="Number"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue ">{userData.phone}</p>
            )}
          </div>

          <div className="flex  gap-5">
            <p className="font-md text-black mt-3">Address:</p>
            {isEdit ? (
              <>
                <input
                  value={userData.address.line1}
                  type="text"
                  className="text-gray-500 mt-4"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev, line1: e.target.value },
                    }))
                  }
                />

                <input
                  type="text"
                  value={userData.address.line2}
                  className="text-gray-500 ml-3 mt-4"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev, line2: e.target.value },
                    }))
                  }
                />
              </>
            ) : (
              <div className="flex-col">
                <p className="text-gray-500 mt-3">{userData.address.line1}</p>

                <p className="text-gray-500 mb-2">{userData.address.line2}</p>
              </div>
            )}
          </div>

          <p className="text-gray-500 text-xl mt-2 mb-3 ">BASIC INFORMATION</p>
          <div className="flex  gap-6">
            <p className="font-md text-black">Gender:</p>
            {isEdit ? (
              <>
                <select
                  value={userData.dob}
                  className="text-gray-500"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option className="text-gray-500" value="MALE">
                    MALE
                  </option>
                  <option className="text-gray-500" value="FEMALE">
                    FEMALE
                  </option>
                </select>
              </>
            ) : (
              <>
                <p className="text-gray-500 ">{userData.gender}</p>
              </>
            )}
          </div>

          <div className="flex  gap-4 mt-2">
            <p className="font-md  text-black">Birthday:</p>

            {isEdit ? (
              <>
                <input
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              </>
            ) : (
              <p className="text-gray-500">{userData.dob}</p>
            )}
          </div>

          {isEdit ? (
            <button
              type="submit"
              className="bg-primary text-white mt-10 mb-10 justify-center items-center flex h-[54px] w-[230px] border border-blue-400 rounded-[44px] p-6"
              onClick={handleSubmit}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-primary text-white 
               hover:bg-blue-700 hover:text-white mt-10 mb-10 justify-center items-center flex h-[54px] w-[127px] border border-blue-400 rounded-[44px] p-6"
              onClick={() => SetIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;


import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContexts.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, aToken, loadUserProfileData, backEndUrl } =
    useContext(AppContext);

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

      if (data.success) {
        toast.success("Profile updated successfully");
        await loadUserProfileData();
        SetIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    userData && (
      <div className="flex justify-center items-start px-4 py-8">
        <div className="w-full max-w-[600px]">
          <div className="flex justify-center mb-6">
            {isEdit ? (
              <label htmlFor="image" className="cursor-pointer">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  className="w-[140px] h-[140px] object-cover rounded-md opacity-75"
                  alt="profile"
                />
                <input
                  hidden
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            ) : (
              <img
                className="w-[140px] h-[140px] object-cover rounded-md"
                src={userData.image}
                alt="profile"
              />
            )}
          </div>

          {/* Name */}
          {isEdit ? (
            <input
              value={userData.name}
              className="w-full mb-4 p-2 border border-gray-300 rounded text-black font-medium text-lg"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-xl font-medium text-center mb-4">
              {userData.name}
            </p>
          )}

          {/* Contact Info */}
          <h3 className="text-gray-500 text-xl font-semibold mb-3">
            Contact Information
          </h3>
          <div className="mb-2">
            <span className="font-medium text-black">Email:</span>
            <p className="text-blue-600">{userData.email}</p>
          </div>

          <div className="mb-4">
            <span className="font-medium text-black">Phone:</span>
            {isEdit ? (
              <input
                type="tel"
                value={userData.phone}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-600">{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <span className="font-medium text-black">Address:</span>
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="w-full mt-1 mb-2 p-2 border border-gray-300 rounded"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </>
            ) : (
              <>
                <p className="text-gray-600">{userData.address.line1}</p>
                <p className="text-gray-600">{userData.address.line2}</p>
              </>
            )}
          </div>

          {/* Basic Info */}
          <h3 className="text-gray-500 text-xl font-semibold mb-3">
            Basic Information
          </h3>
          <div className="mb-3">
            <span className="font-medium text-black">Gender:</span>
            {isEdit ? (
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded text-gray-700"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}
          </div>

          <div className="mb-6">
            <span className="font-medium text-black">Birthday:</span>
            {isEdit ? (
              <input
                type="date"
                className="w-full mt-1 p-2 border border-gray-300 rounded text-gray-700"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>

          {/* Buttons */}
          {isEdit ? (
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => SetIsEdit(true)}
              className="w-full py-3 bg-primary hover:bg-blue-700 text-white font-medium rounded"
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

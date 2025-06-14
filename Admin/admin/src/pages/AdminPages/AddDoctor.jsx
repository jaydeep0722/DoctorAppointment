import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExprience] = useState("");
  const [education, setEducation] = useState("");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState('General physician');
  const [about, setAbout] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { aToken, backEndUrl } = useContext(AdminContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocImg(file); // Store the file itself, not the URL
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) return toast.error("Image is Not Selected");

      // make data for add doctor data
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", education);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("image", docImg);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      });

      const response = await axios.post(
        backEndUrl + "/api/admin/add_doctor",
        formData,
        { headers: { aToken } }
      );
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setDocImg(false);
        // setName("");
        // setEmail("");
        // setPassword("");
        // // setEducation("");
        // setExprience("");
        // setFees("");
        // setSpeciality("");
        // // setAbout("");
        // setAddress1("");
        // setAddress2("");
      } else {
        toast.error("Unable to add");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form className="bg-gray-400 w-[100%]" onSubmit={handlesubmit}>
      <p className="text-black  font-semibold text-2xl ml-8 mt-4 mr-4 mb-4 px-10 py-6">
        Add Doctor
      </p>

      <div className="bg-white  h-[900px] w-[1026px]  m-4 px-10 ml-16 py-6">
        <div className=" min-w-full max-h-40 flex items-center gap-3">
          <label htmlFor="img_id">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              className="w-20 h-20  border rounded-full shadow object-contain "
            />
          </label>
          <input type="file" id="img_id" hidden onChange={handleFileChange} />
          <p className="text-gray-500 text-sm font-bold ">
            Upload Doctor<br></br>Picture
          </p>
        </div>

        <div className="flex justify-between ">
          <div className=" w-[45%]">
            {/* name */}
            <div className="flex flex-col  h-[60px] p-4 gap-3 mb-6">
              <p className="text-gray-700  font-semibold">Doctor Name</p>
              <input
                className="border py-2 text-md text-gray-400 rounded-md list-none items-center "
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* email */}
            <div className="flex flex-col   h-[60px] p-4 gap-3 mb-6">
              <p className="text-gray-700  font-semibold">Doctor Email</p>
              <input
                className="border py-2 text-sm text-gray-400 rounded-md list-none items-center "
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* password */}
            <div className="flex flex-col   h-[60px] p-4 gap-3 mb-6">
              <p className="text-gray-700  font-semibold">Doctor Password</p>
              <input
                className="border  px-3 py-2 text-sm text-gray-400 rounded-md list-none items-center "
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* experience */}

            <div className=" flex mt-14 gap-8">
              <label
                htmlFor="experience_label"
                className="text-gray-700  font-semibold  ml-4"
              >
                Experience
              </label>
              <select
                name="Experience"
                id="experience_label"
                className="border rounded font-semibold px-3 py-1 text-gray-700"
                value={experience}
                onChange={(e) => setExprience(e.target.value)}
              >
                <option value="1 YEAR">1 YEAR</option>
                <option value="2 YEARS">2 YEARS</option>
                <option value="3 YEARS">3 YEARS</option>
                <option value="4 YEARS">4 YEARS</option>
                <option value="5 YEARS">5 YEARS</option>
                <option value="6 YEARS">6 YEARS</option>
                <option value="7 YEARS">7 YEARS</option>
                <option value="8 YEARS">8 YEARS</option>
                <option value="9 YEARS">9 YEARS</option>
                <option value="10 YEARS">10 YEARS</option>
              </select>
            </div>

            {/* fess */}
            <div className="flex flex-col   h-[60px] p-4 gap-3 mb-6 ">
              <p className="text-gray-700  font-semibold">Fees</p>
              <input
                className="border py-2 text-sm text-gray-700 rounded-md list-none items-center "
                type="text"
                placeholder="fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>
          </div>

          {/* speciality */}
          <div className="flex flex-col  w-[45%] ">
            <div className="flex  gap-8 items-center m-4">
              <p className="text-gray-700 text-sm font-bold ">Speciality</p>
              <select
                className="border rounded font-semibold gap-3 px-3 py-1 text-gray-700"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            {/* Education */}
            <div className="flex flex-col   h-[60px] p-4 gap-3 mb-6 ">
              <p className="text-gray-700  font-semibold">Education</p>
              <input
                className="border py-2 text-sm text-gray-700 rounded-md list-none items-center "
                type="text"
                placeholder="Education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>

            {/* address 2lines */}
            <div className="flex flex-col   h-[60px] p-4 gap-3 mb-6 ">
              <p className="text-gray-700 font-semibold">Address</p>

              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Address line 1"
                  className="border py-2 text-sm text-gray-700 rounded-md list-none items-center "
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Address line 2"
                  className="border py-2 text-sm text-gray-700 rounded-md list-none items-center "
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 mb-5 mr-5 ml-4 gap-4 ">
          <p className="text-gray-500 font-semibold">About</p>
          <textarea
            className="w-full text-gray-500 border border-gray-300 p-2 rounded "
            rows="5"
            placeholder="Enter About Doctor here..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>

        <div className="ml-3">
          <button className="btn">Add doctor</button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;

import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [Admin, setAdmin] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backEndUrl } = useContext(AdminContext);
  const { setDToken, dbackEndUrl } = useContext(DoctorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Admin === "Admin") {
        const { data } = await axios.post(
          backEndUrl + "/api/admin/adminLogin",
          {
            email,
            password,
          }
        );

        if (data.success) {
          // console.log(data.TOKEN);
          setAToken(data.TOKEN);
          localStorage.setItem("aToken", data.TOKEN);
        }
      } else {
        // login Doctor
        const { data } = await axios.post(
          dbackEndUrl + "/api/doctor/loginDoctor",
          {
            email,
            password,
          }
        );

        if (data.success) {
          toast.success("Doctor Login Success");
          setDToken(data.TOKEN);
          localStorage.setItem("dToken", data.TOKEN);
        }
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      setDToken("");
    }
  };
  return (
    <div>
      <div className=" flex justify-center h-[800px]  items-center">
        <form
          onSubmit={handleSubmit}
          className=".shadow-box p-10 text-gray-500 border-gray border rounded-md h-[450px] w-[476px]"
        >
          <div>
            <h3 className="text-primary text-xl font-bold mt-3 mb-2">
              {Admin == "Admin" ? "Admin" : "Doctor"}{" "}
              <span className="text-gray-600 text-xl font-bold mt-3 mb-2">
                Login
              </span>
            </h3>
          </div>

          <div className="text-gray-600 gap-3  flex flex-col">
            <label htmlFor="">Email</label>
            <input
              className="h-[42px] text-black w-[342px] border-gray border rounded-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="">Password</label>
            <input
              className="h-[42px]  text-black w-[342px] border-gray border rounded-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-[342px] text-xl  h-[50px] rounded-md background text-white items-center p-2 mt-5 mb-3">
            Login
          </button>

          <div className="mt-3">
            {Admin == "Admin" ? (
              <p className="cursor-pointer">
                Doctor Login?
                <span
                  onClick={() => setAdmin("Doctor")}
                  className="text-primary underline"
                >
                  Click Here
                </span>
              </p>
            ) : (
              <p className="cursor-pointer">
                Admin Login?
                <span
                  onClick={() => setAdmin("Admin")}
                  className="text-primary underline"
                >
                  Click Here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

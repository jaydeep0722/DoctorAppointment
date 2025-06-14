import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContexts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { backEndUrl, setAToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (state == "Sign Up") {
      try {
        const { data } =await  axios.post(backEndUrl + '/api/user/RegisterUser', {
          fullName,
          email,
          password,
        });
        console.log(backEndUrl + "/api/user/RegisterUser");
        console.log(data.TOKEN)

        if (data.success) {
          setAToken(data.TOKEN);
          localStorage.setItem("aToken", data.TOKEN);
          toast.success("Register  Success");
          navigate("/login");
        } else {
          toast.error('Registration failed')
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const { data } =await  axios.post(backEndUrl + '/api/user/loginUser', {
          email,
          password,
        });
        // console.log(backEndUrl + "/api/user/loginUser");
        console.log(data)

        if (data.success) {
          setAToken(data.TOKEN)
          localStorage.setItem("aToken", data.TOKEN);
          toast.success("Login Success");
          navigate("/");
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="flex justify-center h-[800px] items-center">
      <form
        onSubmit={handleSubmit}
        className="p-10 text-gray-500 border-gray border rounded-md h-[538px] w-[476px]"
      >
        <div>
          <h3 className="text-gray-600 text-xl font-bold mt-3 mb-2">
            {state == "Sign Up" ? "Create Account" : "Login"}
          </h3>
          <p className="text-sm mb-2">
            Please {state == "Sign Up" ? "Create Account" : "Login"} to book
            appointment
          </p>
        </div>

        <div className="text-gray-600 gap-3  flex flex-col">
          {state === "Sign Up" && (
            <>
              <label htmlFor="">Full Name</label>
              <input
                className="h-[42px] text-black w-[342px] border-gray border rounded-sm"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </>
          )}

          <label>Email</label>
          <input
            className="h-[42px] text-black w-[342px] border-gray border rounded-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            className="h-[42px] text-black w-[342px] border-gray border rounded-sm"
            type="password"
            autoComplete="current-password"
            // autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="w-[342px] text-xl  h-[50px] rounded-md background text-white items-center p-2 mt-5 mb-3">
          {state == "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="mt-3">
          {state == "Sign Up" ? (
            <p className="cursor-pointer">
              Already have an account?
              <span
                onClick={() => setState("Login")}
                className="text-blue-500 underline"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="cursor-pointer">
              Create New Account?
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-500 underline"
              >
                Sign Up Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;

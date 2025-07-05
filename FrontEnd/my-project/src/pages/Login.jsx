
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      try {
        const { data } = await axios.post(
          `${backEndUrl}/api/user/RegisterUser`,
          {
            fullName,
            email,
            password,
          }
        );

        if (data.success) {
          setAToken(data.TOKEN);
          localStorage.setItem("aToken", data.TOKEN);
          toast.success("Registration Successful");
          navigate("/login");
        } else {
          toast.error("Registration failed");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const { data } = await axios.post(`${backEndUrl}/api/user/loginUser`, {
          email,
          password,
        });

        if (data.success) {
          setAToken(data.TOKEN);
          localStorage.setItem("aToken", data.TOKEN);
          toast.success("Login Successful");
          navigate("/");
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-12 bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-300 rounded-md p-8 shadow-md"
      >
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Please {state === "Sign Up" ? "create an account" : "log in"} to book
          an appointment.
        </p>

        <div className="flex flex-col gap-4 text-gray-700">
          {state === "Sign Up" && (
            <div>
              <label htmlFor="name" className="block mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 rounded mt-6"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-500 underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-500 underline cursor-pointer"
              >
                Sign up here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;

"use client";
import React from "react";
import Image from "next/image";
import loginBanner from "../../assets/login.png";
import loginbg from "../../assets/loginbg.jpeg";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import UserContext from "@/context/userContext";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const loginFormSubmitted = async (event) => {
    event.preventDefault();
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
        toast.info("Invalid Data !!", {
          position: "top-center",
        });
        return;
      }

      try {
        const result = await login(loginData);
        Cookies.set("authToken", result.token, {expires: 7});
        toast.success("Logged In");
        //redirect
        context.setUser(result.user);
        router.push("/profile/user");
      } catch (error) {
        toast.error(error?.response?.data?.msg, {
          position: "top-center",
        });
      }
  };
  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md">
        <div className="flex flex-col justify-center items-center">
          <Image src={loginBanner} alt="signup banner" width={280} height={80} />
          <h1 className="text-3xl font-sans text-blue-600 mt-4">Login Here...</h1>
        </div>

        <form className="mt-6" onSubmit={loginFormSubmitted}>
          {/* ... your input fields ... */}
          <div className="mt-5">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium mb-2 ps-2 text-black"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-2xl bg-gray-700 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter here"
                id="user_email"
                name="user_email"
                  onChange={(event) => {
                    setLoginData({
                      ...loginData,
                      email: event.target.value,
                    });
                  }}
                  value={loginData.email}
              />
            </div>
            {/* password */}
            <div className="mt-3">
              <label
                htmlFor="user_password"
                className="block text-sm font-medium mb-2 ps-2 text-black"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-2xl bg-gray-700 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter here"
                id="user_password"
                  onChange={(event) => {
                    setLoginData({
                      ...loginData,
                      password: event.target.value,
                    });
                  }}
                  value={loginData.password}
              />
            </div>

          <div className="mt-4 flex justify-center space-x-4">
            <button
              type="submit"
              className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-400"
            >
              Login
            </button>
            <button
              type="button"
              className="w-1/2 bg-orange-600 text-white py-2 rounded hover:bg-orange-400"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>


{/*      --------->> Old Unresponsive code <<---------                    */}

    {/* <div className="p-2 grid grid-cols-12">
      <div className="p-4 rounded-3xl col-span-4 col-start-5 bg-slate-900">
        <div className="py-1">
          <div className="flex justify-center m-5">
            <Image
              src={loginBanner}
              alt="signup banner"
              style={{
                width: "80%",
              }}
            />
          </div>

          <h1 className="text-3xl font-sans text-center text-blue-600">
            Login Here...{" "}
          </h1>

          <form action="#!" onSubmit={loginFormSubmitted}>
            <div className="mt-5">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium mb-2 ps-2"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-2xl bg-gray-700 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter here"
                id="user_email"
                name="user_email"
                  onChange={(event) => {
                    setLoginData({
                      ...loginData,
                      email: event.target.value,
                    });
                  }}
                  value={loginData.email}
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="user_password"
                className="block text-sm font-medium mb-2 ps-2"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-2xl bg-gray-700 focus:ring-gray-400-100 border border-gray-800"
                placeholder="Enter here"
                id="user_password"
                  onChange={(event) => {
                    setLoginData({
                      ...loginData,
                      password: event.target.value,
                    });
                  }}
                  value={loginData.password}
              />
            </div>

            <div className="mt-3 text-center">
              <button
                type="submit"
                className="px-3 py-2 bg-green-600  rounded hover:bg-green-400"
              >
                Login
              </button>
              <button
                type="button"
                className="px-3 py-2 bg-orange-600 ms-3 rounded hover:bg-orange-400"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default Login;

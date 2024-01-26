"use client";
import React, { useState } from "react";
import signUpBanner from "../../assets/singup.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { signUp } from "@/services/userService";
import axios from "axios";

const Signup = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      const [imgData] = event.target.files;
      const formData = new FormData();
      formData.append("file", imgData);
      formData.append("upload_preset", "task_manager");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dfzbbx31u/image/upload",
          formData
        );
        setImgUrl(res.data.url);
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error("Error uploading image. Please try again.");
      }
    }
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const doSignup = async (event) => {
    event.preventDefault();

    if (data.name.trim() === "" || data.name == null) {
      toast.warning("Name is required !!", {
        position: "top-center",
      });
      return;
    }
    if (data.email.trim() === "" || data.email == null) {
      toast.warning("Email is required !!", {
        position: "top-center",
      });
      return;
    }
    if (data.password.trim() === "" || data.password == null) {
      toast.warning("Password is required !!", {
        position: "top-center",
      });
      return;
    }

    // form submit
    try {
      const result = await signUp({ ...data, profileURL: imgUrl });
      toast.success("User is registered !!", {
        position: "top-center",
      });
      setData({
        name: "",
        email: "",
        password: "",
      });
      setImageSrc("")
      setImgUrl("")
    } catch (error) {
      toast.error("Signup Error !! " + error.response.data.msg, {
        position: "top-center",
      });
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
    });
    setImageSrc("");
    setImgUrl("");
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md">
          <div className="flex flex-col justify-center items-center m-5">
            <Image
              src={signUpBanner}
              alt="signup banner"
              width={150}
              height={150}
            />
            <h1 className="text-3xl font-sans text-blue-600 mt-4">
              Signup Here
            </h1>
          </div>

          {/* profile image */}
          <div className="mt-3" id="input-group">
            <label
              htmlFor="user_profile"
              className="flex flex-row text-sm font-medium text-black mb-2 ps-2"
            >
              Profile Image <p className="text-red-600">*</p>
            </label>
            <div style={{ textAlign: "center" }}>
              <div className="mt-6 flex items-center justify-items-center">
                <input type="file" onChange={handleFileChange} />
                {imageSrc && (
                  <img
                    src={imageSrc}
                    className="w-36 h-36  rounded-lg object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          <form className="mt-6" onSubmit={doSignup}>
            {/* ... your input fields ... */}
            {/* name */}
            <div className="mt-3" id="input-group">
              <label
                htmlFor="user_name"
                className="flex flex-row text-sm font-medium text-black mb-2 ps-2"
              >
                Username <p className="text-red-600">*</p>
              </label>
              <input
                type="text"
                id="user_name"
                className="w-full p-3 rounded-2xl bg-blue-200 text-black focus:ring-gray-400-100 border border-gray-800"
                placeholder=""
                name="user_name"
                onChange={(event) => {
                  setData({
                    ...data,
                    name: event.target.value,
                  });
                }}
                value={data.name}
              />
              {/* <label className="placeholder">
                Name<span className="text-red-700">*</span>
              </label> */}
            </div>
            {/* email */}
            <div className="mt-3" id="input-group">
              <label
                htmlFor="user_email"
                className="flex flex-row text-sm font-medium text-black mb-2 ps-2"
              >
                Email <p className="text-red-600">*</p>
              </label>
              <input
                type="email"
                id="user_email"
                className="w-full p-3 rounded-2xl bg-blue-200 text-black focus:ring-gray-400-100 border border-gray-800"
                placeholder=""
                name="user_email"
                onChange={(event) => {
                  setData({
                    ...data,
                    email: event.target.value,
                  });
                }}
                value={data.email}
              />
              {/* <label className="placeholder">
                Email<span className="text-red-700">*</span>
              </label> */}
            </div>
            {/* password */}
            <div className="mt-3" id="input-group">
              <label
                htmlFor="user_password"
                className="flex flex-row text-sm font-medium text-black mb-2 ps-2"
              >
                Password <p className="text-red-600">*</p>
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 rounded-2xl bg-blue-200 text-black focus:ring-gray-400-100 border border-gray-800"
                placeholder=""
                onChange={(event) => {
                  setData({
                    ...data,
                    password: event.target.value,
                  });
                }}
                value={data.password}
              />
              {/* <label className="placeholder">
                Password<span className="text-red-700">*</span>
              </label> */}
            </div>

            {/* about section */}
            {/* <div className="mt-3" id="input-group">
              <label
                htmlFor="user_about"
                className="block text-sm font-medium mb-2 ps-2"
              >
                About
              </label>
              <textarea
                className="w-full p-3 rounded-2xl bg-gray-700 focus:ring-gray-400-100 border border-gray-800"
                placeholder=""
                id="input"
                name="user_about"
                rows={7}
                onChange={(event) => {
                  setData({
                    ...data,
                    about: event.target.value,
                  });
                }}
                value={data.about}
              ></textarea>
              <label className="placeholder">About</label>
            </div> */}

            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="submit"
                className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-400"
              >
                Signup
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-1/2 bg-orange-600 text-white py-2 rounded hover:bg-orange-400"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="p-2 grid grid-cols-12">
      <div className="p-4 rounded-3xl col-span-4 col-start-5 bg-white">
        <div className="py-1-">
          <div className="flex justify-center m-5">
            <Image
              src={signUpBanner}
              alt="signup banner"
              style={{
                width: "60%",
              }}
            />
          </div>
          <h1 className="text-3xl font-sans text-center text-blue-600">
            Signup Here...
          </h1>
          <form action="#!" className="mt-5" onSubmit={doSignup}>

            <div 
            className="mt-3" id="input-group" >
              <label
                htmlFor="user_name"
                className="flex flex-row text-sm font-medium mb-2 ps-2"
              >
                Username <p className="text-red-600">*</p>
              </label>
              <input
                type="text"
                id="input"
                className="w-full p-3 rounded-2xl bg-gray-700 focus:ring-gray-400-100 border border-gray-800"
                placeholder=""
                name="user_name"
                onChange={(event) => {
                  setData({
                    ...data,
                    name: event.target.value,
                  });
                }}
                value={data.name}
              />
              <label className="placeholder">Name<span className="text-red-700">*</span></label>
            </div>
          
            <div className="mt-3" id="input-group">
              <label
                htmlFor="user_email"
                className="flex flex-row text-sm font-medium mb-2 ps-2"
              >
                Email <p className="text-red-600">*</p>
              </label>
              <input
                type="email"
                id="input"
                className="w-full p-3 rounded-2xl bg-gray-700 focus:ring-gray-400-100 border border-gray-800"
                placeholder=""
                name="user_email"
                onChange={(event) => {
                  setData({
                    ...data,
                    email: event.target.value,
                  });
                }}
                value={data.email}
              />
              <label className="placeholder">Email<span className="text-red-700">*</span></label>
            </div>
      
            <div className="mt-3" id="input-group">
              <label
                htmlFor="user_password"
                className="flex flex-row text-sm font-medium mb-2 ps-2"
              >
                Password <p className="text-red-600">*</p>
              </label>
              <input
                type="password"
                id="input"
                className="w-full p-3 rounded-2xl bg-gray-700 focus:ring-gray-400-100 border border-gray-800"
                placeholder=""
                onChange={(event) => {
                  setData({
                    ...data,
                    password: event.target.value,
                  });
                }}
                value={data.password}
              />
              <label className="placeholder">Password<span className="text-red-700">*</span></label>
            </div>
    
            <div className="mt-3" id="input-group">
              <label
                htmlFor="user_about"
                className="block text-sm font-medium mb-2 ps-2"
              >
                About
              </label>
              <textarea
                className="w-full p-3 rounded-2xl bg-gray-700 focus:ring-gray-400-100 border border-gray-800"
                placeholder=""
                id="input"
                name="user_about"
                rows={7}
                onChange={(event) => {
                  setData({
                    ...data,
                    about: event.target.value,
                  });
                }}
                value={data.about}
              >
              </textarea>
                <label className="placeholder">About</label>
            </div>
            <div className="mt-3 flex justify-center">
              <button
                type="submit"
                className="px-3 py-2 bg-green-600  rounded hover:bg-green-400"
              >
                Signup
              </button>
              <button
                type="button"
                onClick={resetForm}
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

export default Signup;

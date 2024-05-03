import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import "./bg.css";

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <Link to="/" className="text-cyan-400 font-serif underline-none mr-auto text-xl">
        BusInfo
      </Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/" className="text-white hover:text-blue-400 underline-none font-sans">
          Home
        </Link>
        <Link
          to="/company"
          className="text-white hover:text-blue-400 underline-none font-sans"
        >
          Company
        </Link>
      </div>
    </nav>
  );
}



function LoginDriver() {
  const [phoneNo, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNo || !password) {
      alert("Phone number and password are required.");
      return;
    }
    const formData = {
      phoneNo,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/drivers/login",
        formData
      );
      console.log(res);
      const token = res.data.token;
      document.cookie = `token=${token}; max-age=360000; path=/`;
      console.log(token);
      if(res.status){
        window.location.href = '/driverPage';
      }
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while logging in the driver. Please try again later."
      );
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Driver Login
        </h2>
        <div className="mb-4">
          <label
            className="text-left block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Phone Number
          </label>
          <div className="flex items-center border-b  border-blue-500 py-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              id="phoneNo"
              type="text"
              placeholder="Enter your phone number"
              value={phoneNo}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="text-left block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex items-center border-b  border-blue-500 py-2">
            <FontAwesomeIcon icon={faLock} className="mr-2 text-blue-500" />
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link
            to="/driverPage"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/driverReg" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}

function DriverLog() {
  return (
    <>
      <Navbar />
      <LoginDriver />
    </>
  );
}

export default DriverLog;

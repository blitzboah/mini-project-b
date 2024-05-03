import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import "./bg.css";

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4 font-sans"> {/* Apply font-sans class to the nav element */}
      <Link to="/" className="text-cyan-400 underline-none mr-auto text-xl font-serif">
        BusInfo
      </Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/" className="text-white hover:text-blue-500 underline-none">
          Home
        </Link>
        <Link
          to="/driver"
          className="text-white hover:text-blue-500 underline-none"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}



function DriverForms() {
  const [formData, setFormData] = useState({
    companyName: "",
    driverName: "",
    phoneNumber: "",
    licenseNumber: "",
    driverAddress: "",
    password: "",
    expiryDate: "",
    licensePhoto: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("companyName", formData.companyName);
      formDataToSend.append("driverName", formData.driverName);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("licenseNumber", formData.licenseNumber);
      formDataToSend.append("driverAddress", formData.driverAddress);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("expiryDate", formData.expiryDate);
      formDataToSend.append("licensePhoto", formData.licensePhoto);

      const response = await axios.post(
        "http://localhost:3000/api/drivers/register",
        formDataToSend
      );
      console.log(response.data);
      if(response.status >= 200){
        window.location.href = '/driver';
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex-grow w-full flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mt-20">
        <div className="mb-4 text-center">
          <FontAwesomeIcon
            icon={faUser}
            className="text-5xl text-blue-500 mb-2"
          />
          <h2 className="text-2xl font-bold">Driver Registration</h2>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <div className="form-header">
              <h2>Enter the required details:</h2>
            </div>
            <br />
            <div className="input-group">
              <label
                htmlFor="companyName"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Company Name:
              </label>
              <input
                type="text"
                name="companyName"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="driverName"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Driver Name:
              </label>
              <input
                type="text"
                name="driverName"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.driverName}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="phoneNumber"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number:
              </label>
              <input
                type="text"
                className="text-left border border-gray-400 rounded px-3 py-2 w-full"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="licenseNumber"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                License Number:
              </label>
              <input
                type="text"
                className=" border border-gray-400 rounded px-3 py-2 w-full"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="driverAddress"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Driver Address:
              </label>
              <input
                type="text"
                name="driverAddress"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.driverAddress}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="password"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.password}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="expiryDate"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Date of Expiry of license:
              </label>
              <input
                type="date"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="licensePhoto"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                License Photo:
              </label>
              <input
                type="file"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                id="licensePhoto"
                name="licensePhoto"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
            </div>
            <br />
            <div className="input-group">
              <button
                type="submit"
                name="reg_driver"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function RegisterDrivers() {
  return (
    <>
      <Navbar />
      <DriverForms />
    </>
  );
}

export default RegisterDrivers;

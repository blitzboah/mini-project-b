import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import "./bg.css";

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <Link to="/" className="text-cyan-400 underline-none mr-auto text-xl font-serif">
        BusInfo
      </Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/" className="text-white hover:text-blue-500 underline-none font-sans">
          Home
        </Link>
        <Link
          to="/company"
          className="text-white hover:text-blue-500 underline-none font-sans"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}


function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    address: "",
    phoneNo: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { companyName, email, address, phoneNo, password } = formData;

      const userData = {
        companyName,
        email,
        address,
        phoneNo,
        password,
      };

      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        userData
      );
      if (response.status === 201 || 200) {
        window.alert("Company successfully registered. Please check your email to verify yourself.");
        setFormData({
          companyName: "",
          email: "",
          address: "",
          phoneNo: "",
          password: "",
        });
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
          <h2 className="text-2xl font-bold">Company Registration</h2>
        </div>
        <form onSubmit={handleSubmit}>
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
                htmlFor="email"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.email}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="address"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Address:
              </label>
              <input
                type="text"
                name="address"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.address}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="phoneNo"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                name="phoneNo"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.phoneNo}
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
            <br />
            <div className="input-group">
              <button
                type="submit"
                name="reg_user"
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

function RegisterCompany() {
  return (
    <>
      <Navbar />
      <UserRegistrationForm />
    </>
  );
}

export default RegisterCompany;

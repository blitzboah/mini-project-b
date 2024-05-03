import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <Link to="/" className="text-cyan-400 underline-none mr-auto text-xl font-serif">BusInfo</Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/" className="text-white hover:text-blue-500 underline-none font-sans">Home</Link>
        <Link to="/vehicleViewPage" className="text-white hover:text-blue-500 underline-none font-sans">View</Link>
      </div>
    </nav>
  );
}



function VehicleRegistration() {
  const [formData, setFormData] = useState({
    busNumber: "",
    permitExpiry: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/registerVehicle",
        formData,
        { withCredentials: true }
      );
      if(response.status >= 200){
        window.alert("The Vehicle was registered successfully.");
        setFormData({
        busNumber: "",
        permitExpiry: "",
        });
      }
    } catch (error) {
      console.error("Error registering vehicle:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold">Register Your Vehicle:</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="input-group">
              <label
                htmlFor="busNumber"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Vehicle Registration Number:
              </label>
              <input
                type="text"
                name="busNumber"
                id="busNumber"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.busNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mt-4">
              <label
                htmlFor="permitExpiry"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Date of Expiry of Permit:
              </label>
              <input
                type="date"
                name="permitExpiry"
                id="permitExpiry"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                min={new Date().toISOString().split("T")[0]}
                value={formData.permitExpiry}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mt-6">
              <button
                type="submit"
                name="reg_bus"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
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

function VehiclePage(){
    return(    
            <>
            <Navbar/>
            <div className="bg-gray-700">
                <VehicleRegistration/>
            </div>
            </>
    );
}

export default VehiclePage;

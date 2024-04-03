import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import './bg.css'


function Navbar() {
    return (
      <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
        <a className="text-yellow-300 underline-none mr-auto text-xl" href="#">BusInfo</a>
        <div className="flex justify-center items-center space-x-4">
          <a className="text-white hover:text-yellow-300 underline-none" href="#">Home</a>
          <a className="text-white hover:text-yellow-300 underline-none" href="#">Register</a>
          <a className="text-white hover:text-yellow-300 underline-none" href="#">View</a>
          <a className="text-white hover:text-yellow-300 underline-none" href="#">Logout</a>
        </div>
      </nav>
    );
  }

function DriverForms() {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    driverName: '',
    driverAddress: '',
    driverPhone: '',
    licenseNumber: '',
    dateOfExpiry: '',
    dateOfJoining: '',
    driverPhoto: null,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-white bg-gray-800 p-6 rounded-lg text-center max-w-md">
        <div className="mb-4">
          <FontAwesomeIcon icon={faUser} className="text-5xl text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold">Register Your Drivers</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="input-group">
            <label className="mr-2">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="mr-2">Driver Name:</label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="mr-2">Driver Address:</label>
            <input
              type="text"
              name="driverAddress"
              value={formData.driverAddress}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="mr-2">Driver Phone Number:</label>
            <input
              type="text"
              name="driverPhone"
              value={formData.driverPhone}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="mr-2">Driver Photo:</label>
            <input
              type="file"
              id="driverPhoto"
              name="driverPhoto"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="input-group">
            <label className="mr-2">License Number:</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="mr-2">License Photo:</label>
            <input
              type="file"
              id="licensePhoto"
              name="licensePhoto"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="input-group">
            <label className="mr-2">Date of Expiry of license:</label>
            <input
              type="date"
              name="dateOfExpiry"
              value={formData.dateOfExpiry}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="input-group">
            <label className="mr-2">Date of Joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

function RegisterDrivers(){
    return(
        <>
        <Navbar/>
        <DriverForms/>
        </>
    )
}

export default RegisterDrivers;

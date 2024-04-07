import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import './bg.css';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <a className="text-yellow-300 underline-none mr-auto text-xl" href="#">BusInfo</a>
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
    <div className="flex-grow w-full flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mt-20">
        <div className="mb-4 text-center">
          <FontAwesomeIcon icon={faUser} className="text-5xl text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold">Register Your Drivers</h2>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <div className="form-header">
              <h2>Enter the required details:</h2>
            </div>
            <br />
            <div className="input-group">
              <label htmlFor="registrationNumber" className="text-left block text-gray-700 text-sm font-bold mb-2">Registration Number:</label>
              <input type="text" name="registrationNumber" className="border border-gray-400 rounded px-3 py-2 w-full" value={formData.registrationNumber} onChange={handleInputChange} required size="70" />
            </div>
            <div className="input-group">
              <label htmlFor="driverName" className="text-left block text-gray-700 text-sm font-bold mb-2">Driver Name:</label>
              <input type="text" name="driverName" className="border border-gray-400 rounded px-3 py-2 w-full" value={formData.driverName} onChange={handleInputChange} required size="70" />
            </div>
            <div className="input-group">
              <label htmlFor="driverAddress" className="text-left block text-gray-700 text-sm font-bold mb-2">Driver Address:</label>
              <input type="text" name="driverAddress" className="border border-gray-400 rounded px-3 py-2 w-full" value={formData.driverAddress} onChange={handleInputChange} required size="70" />
            </div>
            <div className="input-group">
              <label htmlFor="driverPhone" className="text-left block text-gray-700 text-sm font-bold mb-2">Driver Phone Number:</label>
              <input type="text" className="text-left border border-gray-400 rounded px-3 py-2 w-full" name="driverPhone" value={formData.driverPhone} onChange={handleInputChange} required size="70" />
            </div>
            <div className="input-group">
              <label htmlFor="licenseNumber" className="text-left block text-gray-700 text-sm font-bold mb-2">License Number:</label>
              <input type="text" className=" border border-gray-400 rounded px-3 py-2 w-full" id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} required size="70" />
            </div>
            <div className="input-group">
              <label htmlFor="licensePhoto" className="text-left block text-gray-700 text-sm font-bold mb-2">License Photo:</label>
              <input type="file" className="border border-gray-400 rounded px-3 py-2 w-full" id="licensePhoto" name="licensePhoto" accept=".jpg,.jpeg,.png" onChange={handleFileChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="dateOfExpiry" className="text-left block text-gray-700 text-sm font-bold mb-2">Date of Expiry of license:</label>
              <input type="date" className="border border-gray-400 rounded px-3 py-2 w-full" name="dateOfExpiry" value={formData.dateOfExpiry} onChange={handleInputChange} min={new Date().toISOString().split("T")[0]} required />
            </div>
            <div className="input-group">
              <label htmlFor="dateOfJoining" className="text-left block text-gray-700 text-sm font-bold mb-2">Date of Joining:</label>
              <input type="date" className="border border-gray-400 rounded px-3 py-2 w-full" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleInputChange} max={new Date().toISOString().split("T")[0]} required />
            </div>
            <br />
            <div className="input-group">
              <button type="submit" name="reg_driver" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
            </div>
          </div>
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

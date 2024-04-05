import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import './bg.css';

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
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
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="mb-4 text-center">
          <FontAwesomeIcon icon={faUser} className="text-5xl text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold">Register Your Drivers</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
              className="appearance-none bg-transparent border-b-2 border-blue-500 w-full text-gray-700 py-1 px-3 leading-tight focus:outline-none focus:border-blue-700"
            />
          </div>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

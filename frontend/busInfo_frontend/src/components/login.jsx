import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faBuilding, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Added faAngleUp icon
import './bg.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <Link to="/" className="text-yellow-300 underline-none mr-auto text-xl">BusInfo</Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/" className="text-white hover:text-blue-400 underline-none">Home</Link>
      </div>
    </nav>
  );
}

function Log() {
  const [showSlide, setShowSlide] = useState(false); // State to track slide visibility
  const [userType, setUserType] = useState('driver');

  const handleToggleSlide = () => {
    setShowSlide(!showSlide);
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setShowSlide(false); // Close the slide after selecting user type
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login To BusInfo</h2>
        <div className="relative mb-4">
          <label className="text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">I am a:</label>
          <div className="relative">
            <div className="flex items-center border-b border-blue-500 py-2">
              <span className="mr-2 text-blue-500 cursor-pointer" onClick={handleToggleSlide}>
                {showSlide ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
              </span>
              <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" id="userType" type="text" value={userType === 'driver' ? 'Driver' : 'Owner'} readOnly />
            </div>
            {showSlide && (
              <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-lg z-10">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleUserTypeChange('driver')}>
                  Driver
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={() => handleUserTypeChange('owner')}>
                  Owner
                </button>
              </div>
            )}
          </div>
        </div>
        {userType === 'driver' ? (
          <div>
            <div className="mb-4">
              <label className="text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Phone Number</label>
              <div className="flex items-center border-b  border-blue-500 py-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" id="email" type="email" placeholder="Enter your phone number" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail</label>
              <div className="flex items-center border-b  border-blue-500 py-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" id="email" type="email" placeholder="Enter your email" />
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <label className="text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <div className="flex items-center border-b  border-blue-500 py-2">
            <FontAwesomeIcon icon={faLock} className="mr-2 text-blue-500" />
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" id="password" type="password" placeholder="Enter your password" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Login
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">Forgot Password?</a>
        </div>
        <div className="mt-4 text-center text-gray-600">Don't have an account? <a className="text-blue-500 hover:underline" href="#">Sign up here</a></div>
      </div>
    </div>
  );
}

function Login() {
  return (
    <>
      <Navbar />
      <Log />
    </>
  );
}

export default Login;

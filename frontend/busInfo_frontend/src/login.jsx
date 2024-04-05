import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './bg.css'

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <a className="text-yellow-300 underline-none mr-auto text-xl" href="#">BusInfo</a>
    </nav>
  );
}

function Log() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login To BusInfo</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail</label>
          <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" id="email" type="email" placeholder="Enter your email" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
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
      </div>
    </div>
  );
}

function Login(){
  return(
    <>
    <Navbar/>
    <Log/>
    </>
  )
}
export default Login;

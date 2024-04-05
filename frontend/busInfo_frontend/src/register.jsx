import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBus } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <a className="text-yellow-300 underline-none mr-auto text-xl" href="#">BusInfo</a>
      <div className="flex justify-center items-center space-x-4">
        <a className="text-white hover:text-yellow-300 underline-none" href="#">Home</a>
        <a className="text-white hover:text-yellow-300 underline-none" href="#">View</a>
        <a className="text-white hover:text-yellow-300 underline-none" href="#">Logout</a>
      </div>
    </nav>
  );
}

function RegisterDrivers() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center mb-8 max-w-md mr-4 flex flex-col justify-between">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faUser} className="text-8xl text-blue-500" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold">Register Your Drivers</h3>
        </div>
        <p className="text-white mb-6">
          Register the drivers related to your company. We keep track of their license validity period. And notify you when the license is about to expire, so you can ask your drivers to renew their license for smooth functioning.
        </p>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ marginTop: '1rem' }} onClick={() => { /* Add your frontend registration logic here */ }}>Register</button>
      </div>
    </div>
  );
}

function RegisterVehicles() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center mb-8 max-w-md mr-4 flex flex-col justify-between">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faBus} className="text-8xl text-blue-500" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold">Register Your Vehicles</h3>
        </div>
        <p className="text-white mb-6">
        Register the vehicles owned by your company. We keep track of the permit renewal of the vehicles, for smooth functionality of your business without facing any legal issues.
        </p>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ marginTop: '1rem' }} onClick={() => { /* Add your frontend registration logic here */ }}>Register</button>
      </div>
    </div>
  );
}



function Register() {
  return (
    <div className="bg-gray-700 min-h-screen text-white">
      <Navbar />
      <section className="container mx-auto py-10 flex flex-wrap justify-center">
        <RegisterDrivers />
        <div style={{ width: '20px' }}></div>
        <RegisterVehicles />
      </section>
    </div>
  );
}

export default Register;

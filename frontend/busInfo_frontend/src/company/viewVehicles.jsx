import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './bg.css'

function Navbar() {
    return (
      <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
        <Link to="/" className="text-cyan-400 underline-none mr-auto text-xl">BusInfo</Link>
        <div className="flex justify-center items-center space-x-4">
          <Link to="/" className="text-white hover:text-blue-500 underline-none">Home</Link>
          <Link to="/" className="text-white hover:text-blue-500 underline-none">Logout</Link>
        </div>
      </nav>
    )
}

function ViewVehicle() {
    const [vehicles, setVehicles] = useState([]);
  
    useEffect(() => {
      // Fetch vehicles data here and set it to state
      const fetchVehicles = async () => {
        // Example fetch request
        const response = await fetch('/api/vehicles');
        const data = await response.json();
        setVehicles(data);
      };
  
      fetchVehicles();
    }, []);
  
    return (
      <div className="bg-gray-700 p-8">
        <div className="bg-white p-4 rounded-md shadow-md">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">License Number</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{vehicle.v_vin || ' '}</td>
                  <td className="border px-4 py-2">{vehicle.v_perexp || ' '}</td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2">Ferrari</td>
                <td className="border px-4 py-2">2047</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Omni</td>
                <td className="border px-4 py-2">2069</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  

function ViewVehiclePage(){
    return(
        <>
        <Navbar/>
          <ViewVehicle/>
        </>
    );
}

export default ViewVehiclePage;

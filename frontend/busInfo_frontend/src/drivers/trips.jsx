import React from 'react';
import { Link } from 'react-router-dom';

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

function TripsPage(/*{ trips }*/) {
  return (
    <div className="bg-gray-800 p-8">
      <div className='bg-white p-4 rounded-md shadow-md'>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">License Number</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* {trips.map((trip, index) => (
              <tr key={index} className="border">
                <td className="px-4 py-2">{trip.trip_date || ' '}</td>
                <td className="px-4 py-2">{trip.trip_time || ' '}</td>
              </tr>
            ))} */}
            <tr>
              <td>9/11/2001</td>
              <td>9hrs 11 min</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

function DriversTrip(){
  return(
    <>
    <Navbar/>
    <TripsPage/>
    </>
  );
}

export default DriversTrip;

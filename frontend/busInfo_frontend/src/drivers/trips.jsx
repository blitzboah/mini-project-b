import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <Link to="/" className="text-cyan-400 underline-none mr-auto text-xl">BusInfo</Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/company" className="text-white hover:text-blue-500 underline-none">Company</Link>
        <Link to="/driver" className="text-white hover:text-blue-500 underline-none">Driver</Link>
      </div>
    </nav>
  )
}

function TripsPage(/*{ trips }*/) {
  return (
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>License Number</th>
          </tr>
        </thead>
        <tbody>
          {/* {trips.map((trip, index) => (
            <tr key={index}>
              <td>{trip.trip_date || ' '}</td>
              <td>{trip.trip_time || ' '}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
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

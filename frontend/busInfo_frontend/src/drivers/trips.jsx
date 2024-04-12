import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <Link to="/" className="text-cyan-400 underline-none mr-auto text-xl">BusInfo</Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/driverPage" className="text-white hover:text-blue-500 underline-none">Home</Link>
        <Link to="/" className="text-white hover:text-blue-500 underline-none">Logout</Link>
      </div>
    </nav>
  )
}

function TripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/drivers/trips",{withCredentials:true});
        setTrips(response.data.tripsDetails);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, []);

  const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split('T'); // Split date and time parts
    const [year, month, day] = datePart.split('-'); // Split date into year, month, and day
    return `${day}/${month}/${year}`; // Format date as day/month/year
  };

  return (
    <div className="bg-gray-800 p-8">
      <div className='bg-white p-4 rounded-md shadow-md'>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Trip Date</th>
              <th className="px-4 py-2 border">Estimated Duration</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {trips && trips.map((trip, index) => ( 
              <tr key={index}>
                <td>{formatDate(trip.trip_date)}</td>
                <td>{trip.trip_time}</td>
              </tr>
            ))}
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

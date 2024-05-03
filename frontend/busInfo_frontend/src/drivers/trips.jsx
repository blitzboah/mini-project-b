import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const handleLogout = async () => {
    try {
      const token = getCookie("token"); 
      if (!token) {
        console.error("Token not found in cookie.");
        return;
      }
      await axios.post("http://localhost:3000/api/drivers/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
      window.location.href = "/driver";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : null;
  };
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <Link to="/" className="text-cyan-400 underline-none mr-auto text-xl font-serif">BusInfo</Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/" className="text-white hover:text-blue-500 underline-none font-sans">Home</Link>
        <button
          onClick={handleLogout}
          className="text-white hover:text-blue-500 underline-none font-sans"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}


function TripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/drivers/trips", { withCredentials: true });
        setTrips(response.data.tripsDetails);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Format as day/month/year
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as HH:MM
  };

  const handleEndTimeChange = (index, event) => {
    const newEndTime = event.target.value;
    setTrips(prevTrips => {
      const updatedTrips = [...prevTrips];
      updatedTrips[index].trip_endtime = newEndTime;
      return updatedTrips;
    });
  };
  const formatDateForDatabase = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const currentDate = new Date().toISOString().split("T")[0];
    return `${currentDate} ${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}:00`;
  };

  const handleSubmit = async (tripId, tripEndTime) => {
    try {
      
      const formattedTripEndTime = formatDateForDatabase(tripEndTime);
      // Send trip end time to the backend
      await axios.post("http://localhost:3000/api/drivers/updateTripEndTime", {
        tripId: tripId,
        tripEndTime: formattedTripEndTime
      });
    } catch (error) {
      console.error("Error updating trip end time:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-8">
      <div className='bg-white p-4 rounded-md shadow-md'>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Trip Date</th>
              <th className="px-4 py-2 border">Trip Start Time</th>
              <th className="px-4 py-2 border">Trip End Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {trips && trips.map((trip, index) => ( 
              <tr key={index}>
                <td>{formatDate(trip.trip_date)}</td>
                <td>{formatTime(trip.trip_starttime)}</td>
                <td>
                  <input
                    type="time"
                    value={trip.trip_endtime || ""}
                    onChange={(event) => handleEndTimeChange(index, event)}
                  />
                  <button onClick={() => handleSubmit(trip.trip_id, trip.trip_endtime)}>Submit</button>
                </td>
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

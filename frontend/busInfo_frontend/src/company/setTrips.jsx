import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import "./bg.css";

function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <Link to="/" className="text-cyan-400 underline-none mr-auto text-xl">
        BusInfo
      </Link>
      <div className="flex justify-center items-center space-x-4">
        <Link
          to="/companyPage"
          className="text-white hover:text-blue-500 underline-none"
        >
          Home
        </Link>
        <Link to="/" className="text-white hover:text-blue-500 underline-none">
          Logout
        </Link>
      </div>
    </nav>
  );
}

function TripForms() {
  const [formData, setFormData] = useState({
    destination: "",
    arrivalLocation: "",
    tripDate: "",
    tripStartTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDateForDatabase = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const currentDate = new Date().toISOString().split("T")[0];
    return `${currentDate} ${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { destination, arrivalLocation, tripDate, tripStartTime } = formData;
    try {
      const formattedTripStartTime = formatDateForDatabase(tripStartTime);
      const response = await axios.post(
        "http://localhost:3000/api/users/trips",
        {
          destinationCity: destination,
          arrivingCity: arrivalLocation,
          date: tripDate,
          startTime: formattedTripStartTime,
        },
        { withCredentials: true }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
      } else {
        throw new Error("Failed to set trip");
      }
    } catch (error) {
      console.error("Error setting trip:", error);
    }
  };

  return (
    <div className="flex-grow w-full flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mt-20">
        <div className="mb-4 text-center">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-5xl text-blue-500 mb-2"
          />
          <h2 className="text-2xl font-bold">Trip Setting</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-header">
              <h2>Enter trip details:</h2>
            </div>
            <br />
            <div className="input-group">
              <label
                htmlFor="destination"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Trip Destination:
              </label>
              <input
                type="text"
                name="destination"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.destination}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="arrivalLocation"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Arrival Location:
              </label>
              <input
                type="text"
                name="arrivalLocation"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.arrivalLocation}
                onChange={handleInputChange}
                required
                size="70"
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="tripDate"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Trip Date:
              </label>
              <input
                type="date"
                name="tripDate"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.tripDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label
                htmlFor="tripStartTime"
                className="text-left block text-gray-700 text-sm font-bold mb-2"
              >
                Trip Start Time:
              </label>
              <input
                type="time"
                name="tripStartTime"
                className="border border-gray-400 rounded px-3 py-2 w-full"
                value={formData.tripStartTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <br />
            <div className="input-group">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Set Trip
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function SetTrip() {
  return (
    <>
      <Navbar />
      <TripForms />
    </>
  );
}

export default SetTrip;

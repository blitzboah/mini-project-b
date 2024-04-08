// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DriverPage from './drivers/driverIndex';
import DriversTrip from './drivers/trips';

function DriverApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DriverPage />} />
        <Route path="/driversTrips" element={<DriversTrip />} />
      </Routes>
    </Router>
  );
}

export default DriverApp;

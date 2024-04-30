// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CompanyPage from './company/companyIndex.jsx';
import VehiclePage from './company/vehicleReg.jsx';
import ViewVehicle from './company/viewVehicles.jsx';
import ViewDriversPage from './company/viewDrivers.jsx';
import SetTrip from './company/setTrips.jsx';
import './App.css';

function CompanyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyPage />} />
        <Route path="/vehicleRegPage" element={<VehiclePage />} />
        <Route path="/vehicleViewPage" element={<ViewVehicle />} />
        <Route path="/viewDriverPage" element={<ViewDriversPage />} />
        <Route path="/setTrips" element={<SetTrip />} />
      </Routes>
    </Router>
  );
}

export default CompanyApp;

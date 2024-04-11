import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './Home';
import DriverLog from './drivers/driverLogin.jsx';
import OwnerLog from './company/ownerLogin.jsx';
import CompanyPage from './company/companyIndex.jsx';
import DriverPage from './drivers/driverIndex.jsx';
import VehiclePage from './company/vehicleReg.jsx';
import ViewVehicle from './company/viewVehicles.jsx';
import ViewDriversPage from './company/viewDrivers.jsx';
import RegisterDrivers from './drivers/driverReg.jsx';
import RegisterCompany from './company/companyReg.jsx';
import TripsPage from './drivers/trips.jsx';
import SetTrip from './company/setTrips.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/driver" element={<DriverLog />} />
        <Route path="/company" element={<OwnerLog />} />

        <Route path="/driverPage" element={<DriverPage />} />
        <Route path="/companyPage" element={<CompanyPage />} />

        <Route path="/vehicleRegPage" element={<VehiclePage />} />
        <Route path="/vehicleViewPage" element={<ViewVehicle />} />
        <Route path="/viewDriverPage" element={<ViewDriversPage />} />
        <Route path="/setTrips" element={<SetTrip />} />

        <Route path="/driverReg" element={<RegisterDrivers />} />
        <Route path="/companyReg" element={<RegisterCompany />} />

        <Route path="/viewTrips" element={<TripsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import DriverLog from './components/driverLogin.jsx';
import OwnerLog from './components/ownerLogin.jsx';
import CompanyPage from './company/companyIndex.jsx';
import VehiclePage from './company/vehicleReg.jsx';
import ViewVehicle from './company/viewVehicles.jsx';
import ViewDriversPage from './company/viewDrivers.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/driver" element={<DriverLog />} />
        <Route path="/company" element={<OwnerLog />} />
        <Route path="/companyPage" element={<CompanyPage />} />
        <Route path="/vehicleRegPage" element={<VehiclePage />} />
        <Route path="/vehicleViewPage" element={<ViewVehicle />} />
        <Route path="/viewDriverPage" element={<ViewDriversPage />} />
      </Routes>
    </Router>
  );
}

export default App;

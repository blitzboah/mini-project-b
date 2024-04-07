import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import DriverPage from './drivers/driverIndex.jsx';
import CompanyPage from './company/companyIndex.jsx';
import TripsPage from './drivers/trips.jsx';
import VehiclePage from './company/vehicleReg.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
      {/* <DriverPage/> */}
      {/* <CompanyPage/> */}
      {/* <VehiclePage/> */}
      {/* <TripsPage/> */}
  </React.StrictMode>,
);
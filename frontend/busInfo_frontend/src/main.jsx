import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import CompanyApp from './companyApp.jsx';
import DriverApp from './driverApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* <App /> */}
      {/* <CompanyApp/> */}
      <DriverApp/>

  </React.StrictMode>,
);
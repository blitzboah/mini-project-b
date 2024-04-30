import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import CompanyApp from './companyApp.jsx';
import DriverApp from './driverApp.jsx';
import MyComponent from '../test.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
      {/* <CompanyApp/> */}
      {/* <DriverApp/> */}
      {/* <MyComponent/> */}

  </React.StrictMode>,
);
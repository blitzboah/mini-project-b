// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import DriverLog from './components/driverLogin.jsx';
import OwnerLog from './components/ownerLogin.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/driver" element={<DriverLog />} />
        <Route path="/company" element={<OwnerLog />} />
        {/* <Route path="/login" element={<OwnerLog />} /> Add this line */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;